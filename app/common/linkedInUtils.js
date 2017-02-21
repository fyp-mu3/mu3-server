var request = require('request')

const getLinkedInProfile = (accessToken) => {
  var map = {
    'r_basicprofile': [
      'id',
      'first-name',
      'last-name',
      'picture-url',
      'picture-urls::(original)',
      'formatted-name',
      'maiden-name',
      'phonetic-first-name',
      'phonetic-last-name',
      'formatted-phonetic-name',
      'headline',
      'location:(name,country:(code))',
      'industry',
      'distance',
      'relation-to-viewer:(distance,connections)',
      'current-share',
      'num-connections',
      'num-connections-capped',
      'summary',
      'specialties',
      'positions',
      'site-standard-profile-request',
      'api-standard-profile-request:(headers,url)',
      'public-profile-url'
    ],
    'r_emailaddress': ['email-address'],
    'r_fullprofile': [
      'last-modified-timestamp',
      'proposal-comments',
      'associations',
      'interests',
      'publications',
      'patents',
      'languages',
      'skills',
      'certifications',
      'educations',
      'courses',
      'volunteer',
      'three-current-positions',
      'three-past-positions',
      'num-recommenders',
      'recommendations-received',
      'mfeed-rss-url',
      'following',
      'job-bookmarks',
      'suggestions',
      'date-of-birth',
      'member-url-resources:(name,url)',
      'related-profile-views',
      'honors-awards'
    ]
  }

  let options = {
    uri: `https://api.linkedin.com/v1/people/~:(id,num-connections,picture-url)?oauth2_access_token=${accessToken}?format=json`,
    method: 'GET'
  }
  console.log(options);
  request(options, (response) => {
    console.log(response);
  })
}

/** Pure function */
const linkedInProfileToUserScore = (profile) => {
  
}

module.exports = {
  getLinkedInProfile: getLinkedInProfile
}