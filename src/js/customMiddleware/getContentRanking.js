/**
 * Get the value of the action for the user on the product
 * @param {string} eventName - the name of the newton event
 * @param {string} eventCategory - the newton category
 * @param {string} contentId - the content id
 * @param {string} userType - free | premium | guest
 * @param {object} contentRankingObject - the map to calculate the rank
 * @param {string} [userFrom=natural] - acquisition | natural
 * @returns {object}
 */
export default function getContentRanking(eventName, eventCategory, contentId, userType, contentRankingObject, userFrom = 'natural') {
  const contentRanking = contentRankingObject;
  if (Object.keys(contentRankingObject).length < 1) {
    return null;
  }
  let scopeType = 'social';
  let ranking = 0;

    // ranking score
  if (userType === 'premium') {
    ranking = contentRanking[eventCategory][eventName][userType][userFrom];
  } else {
    ranking = contentRanking[eventCategory][eventName][userType];
  }

    // scopeType
  if (eventCategory == 'Play') {
    scopeType = 'consumption';
  }

  return {
    contentId,
    score: ranking,
    scope: scopeType,
  };
}
