import {Component, OnInit} from '@angular/core';
import {MetricsService} from '../../../../core/services/metrics.service';
import {TeamService} from '../../../../core/services/team.service';
import {UserService} from '../../../../core/services/user.service';
import {GlobalConstants} from '../../../../common/global-constants';
import {IPost} from '../../../../shared/models/IPost';
import {ITeam} from '../../../../shared/models/ITeam';


@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {

  teams = [];
  teamMembersFullDetail = [];
  selectedTeam;
  teamMembersByEmail;
  members;
  allTags = [];
  individualSentimentData;

  queryCollaborationData: any;
  contributionData: any;
  teamSentimentData: any;
  tagAnalysisData: any;

  colors = [
    '#5fd67d', '#d33fff', '#ff7c7c', '#e7ff60', '#db2955', '#00ffcd', '#36A2EB', '#e2a25d'
  ];


  constructor(
    private metricsService: MetricsService,
    private teamService: TeamService,
  ) {
  }

  ngOnInit() {
    this.teamService.loggedInUserAdminTeams(GlobalConstants.LOGGED_IN_USER).subscribe(resp => {
        resp.forEach(team => {
          this.teams.push({name: team.name});
        });
      }
    );
  }

  /*
  * The `gatherTotalTeamMetrics` function is triggered via an
  * (onChange) listener which computes metrics for the specified
  * team in response to drop-down menu state change.
  */
  gatherTotalTeamMetrics($changeEvent) {


    // capture team selection
    const team = $changeEvent.value.name;

    // trigger a series of metrics computations
    this.fetchTeamMembers(team);
    this.fetchQueryCollaborationMetrics(team);
    this.fetchContributionMetrics(team);
    this.fetchIndividualSentiment(team);    // utilizes custom sentiment API
    this.fetchTeamSentiment(team);          // utilizes custom sentiment API
    this.fetchTagAnalysis(team);

  }

  fetchTeamMembers(team) {
    this.teamMembersFullDetail = [];
    this.metricsService.getTeamMembers(team).subscribe(resp => {
      this.teamMembersByEmail = resp[0].members;
      this.teamMembersByEmail.forEach(member => {
        this.metricsService.getTeamMemberFullProfile(member).subscribe(resp2 => {
          this.teamMembersFullDetail.push(resp2[0]);
        });
      });
    });
  }

  fetchQueryCollaborationMetrics(team) {

    let openCount = 0;
    let closedCount = 0;

    this.metricsService.getQueryCollaboration(team).subscribe((resp: IPost[]) => {
        resp.forEach(post => {
          if (post.status === 'open') {
            openCount++;
          } else if (post.status === 'closed') {
            closedCount++;
          }
        });
        this.queryCollaborationData = {
          labels: [
            'open',
            'closed',
          ],
          datasets: [
            {
              data: [openCount, closedCount],
              backgroundColor: [
                '#db2955',
                '#00ffcd'
              ],
              hoverBackgroundColor: [
                '#db2955',
                '#00ffcd'
              ]
            }]
        };
      }
    );
  }

  fetchContributionMetrics(team) {

    const dataArray = [];
    const labelsArray = [];
    const randColors = [];

    this.metricsService.getTeamMembers(team).subscribe(resp => {
      const members = resp[0].members.toString().split(',');
      members.forEach(member => {
        this.metricsService.getContributionData(team, member).subscribe(data => {
          dataArray.push(data.length);
          labelsArray.push(member);
          randColors.push(this.colors[Math.floor(Math.random() * this.colors.length)]);
          this.contributionData = {
            datasets: [{
              data: dataArray,
              backgroundColor: randColors,
            }],
            labels: labelsArray
          };
        });
      });
    });
  }

  fetchIndividualSentiment(team) {

    const datasetsArray = [];

    this.metricsService.getTeamMembers(team).subscribe(resp => {
      const members = resp[0].members.toString().split(',');
      members.forEach(member => {
        this.metricsService.getIndividualSentiment(team, member).subscribe(data => {
          datasetsArray.push({
            label: member,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            data: [data]
          });
        });
      });
      this.individualSentimentData = {
        datasets: datasetsArray
      };
      // this.individualSentimentData = {
      //   datasets: [
      //     {
      //       label: 'one',
      //       backgroundColor: '#42A5F5',
      //       data: [0.4354]
      //     },
      //     {
      //       label: 'two',
      //       backgroundColor: '#FFA726',
      //       data: [-0.1234]
      //     }
      //   ]
      // };
      console.log(this.individualSentimentData);
    });
  }

  fetchTeamSentiment(team) {
    this.metricsService.getTeamSentiment(team).subscribe(resp => {
      this.teamSentimentData = resp;
    });
  }

  fetchTagAnalysis(team) {
    this.allTags = [];
    const labelsArray = [];
    const dataArray = [];
    let prev: any;
    this.metricsService.getTagAnalysis(team).subscribe(posts => {
      posts.forEach(post => {
        const tags = post.tags.toString().split(',');
        tags.forEach(tag => {

          this.allTags.push(tag);
          this.allTags.sort();

        });
      });
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.allTags.length; i++) {
        if (this.allTags[i] !== prev) {
          labelsArray.push(this.allTags[i]);
          dataArray.push(1);
        } else {
          dataArray[dataArray.length - 1]++;
        }
        prev = this.allTags[i];
      }
      console.log(labelsArray);
      console.log(dataArray);
      this.tagAnalysisData = {
        labels: labelsArray,
        datasets: [
          {
            label: 'Popular tags',
            backgroundColor: '#00ffcd',
            data: dataArray
          }
        ]
      };
      console.log(this.tagAnalysisData);
    });
  }
}

