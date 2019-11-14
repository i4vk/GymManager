# Deployment  
# ----------  

echo Handling node.js gulp deployment.  

# 2. Install npm packages  
if [ -e "$DEPLOYMENT_SOURCE/package.json" ]; then  
  eval $NPM_CMD install  
fi  

# 4. Run gulp for build
if [ -e "$DEPLOYMENT_SOURCE/gulpfile.js" ]; then  
  eval $NPM_CMD install gulp -g
  gulp start-simple
fi  