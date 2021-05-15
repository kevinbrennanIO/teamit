import {Component, OnInit} from '@angular/core';
import algoliasearch from 'algoliasearch/lite';
import {algoliaConfig} from '../../../../configs/algolia-config';

const searchClient = algoliasearch(
  algoliaConfig.appId,
  algoliaConfig.apiKey
);

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  config = {
    indexName: 'teamit',
    searchClient
  };

  constructor() {
  }

  ngOnInit(): void {
  }
}
