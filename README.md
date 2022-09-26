

# To run develeopment environement
### To run frontend
In frontend directory: 
```
yarn start
```
Frontend runs on port localhost:3000
### to run backend
```bash
yarn build && yarn start-dev
```
Backend will run on port localhost:1200


# Deployment setup

- Deployment is setup for single container launches, currently tested on Heroku.
- Environment variables will take care of setting parameters for a launch
- Change util.ts in src/frontend to point to correct backend address of deployed app

## Example heroku deployment
- setup your heroku deployment according to the [setup guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)

- In the root directory(Southwest):
```bash
git push heroku master
```


**The app is eployed on https://southwestdeploy.herokuapp.com/** 