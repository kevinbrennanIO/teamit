const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch')


const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;
const ALGOLIA_INDEX_NAME = 'teamit';
const client = algoliasearch(APP_ID, ADMIN_KEY);

// Update the search index every time a blog post is written.
exports.onPostCreated = functions
    .region('europe-west2')
    .firestore.document('teams/{teamId}/posts/{postId}')
    .onCreate((snap, context) => {
        // Get the post document
        const post = snap.data();
        // Add an 'objectID' field which Algolia requires
        post.objectID = context.params.postId;
        console.log(post)
        // Write to the algolia index
        const index = client.initIndex(ALGOLIA_INDEX_NAME);
        return index.saveObject(post);
    });

// exports.deleteFromIndex = functions.region('europe-west2').firestore.document('teams/{teamID}/posts/{postID}')
// .onDelete(snapshot => index.deleteObject(snapshot.id));
