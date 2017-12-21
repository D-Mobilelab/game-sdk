GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD);
JENKINS_URL=http://ci.docomodigital.com
echo "Start deploy $GIT_BRANCH in $JOB_NAME"
curl -X POST $JENKINS_URL/job/$JOB_NAME/build \
  --user $USER:$JENKINS_TOKEN \
  --data-urlencode json='{"parameter": [{"name":"goal", "value":"install"}, {"name":"profile", "value":"devel"}, {"name":"tag", "value":"'$GIT_BRANCH'"}, {"name":"GIT_REPO", "value": "product/fe/html5game"}, {"name":"GERRIT_REFNAME", "value":"${tag}"}, {"name":"GERRIT_REFSPEC", "value":""}, {"name":"GERRIT_BRANCH", "value":"" } ]}'