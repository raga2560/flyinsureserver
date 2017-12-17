/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// [START imports]
var firebase = require('firebase-admin');
// [END imports]
var nodemailer = require('nodemailer');
var schedule = require('node-schedule');
var Promise = require('promise');
var escape = require('escape-html');
var clientsocket = require('socket.io-client')('http://localhost:8080');



// [END initialize]


function Weekly(io, fb) {

this.startWeeklyTopPostEmailer = function() {
  // Run this job every Sunday at 2:30pm.
  schedule.scheduleJob({hour: 14, minute: 30, dayOfWeek: 0}, function () {
    // List the top 5 posts.
    // [START top_posts_query]
    var topPostsRef = fb.database().ref('/posts').orderByChild('starCount').limitToLast(5);
    // [END top_posts_query]
    var allUserRef = firebase.database().ref('/users');
    Promise.all([topPostsRef.once('value'), allUserRef.once('value')]).then(function(resp) {
      var topPosts = resp[0].val();
      var allUsers = resp[1].val();
      var emailText = createWeeklyTopPostsEmailHtml(topPosts);
      sendWeeklyTopPostEmail(allUsers, emailText);
    }).catch(function(error) {
      console.log('Failed to start weekly top posts emailer:', error);
    });
  });
  console.log('Weekly top posts emailer started...');
}
	
	
}

module.exports = Weekly;
