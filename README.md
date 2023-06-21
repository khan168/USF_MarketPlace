# USF_MarketPlace
A market place for USF students by USF students with no charges of any sort. It is a peer to peer platform for students to buy and sell products.Our website 
works by connecting buyers to sellers and help both parties get what they want done in the most seamless way.

## What it does?

## How it does it?


## Authentication & Authorization

![Screenshot 2023-06-21 123909](https://github.com/khan168/USF_MarketPlace/assets/87687164/93201c9b-9795-4ff9-94a0-20e9a8b3696a)

The complete security of the app is built over Json web tokens which I will refer to as jwt. We set the jwt on the user login or when the user registers. In the case of revisiting the webpage, if the user already has the jwt in the local storage, the user is directed to the home page. The jwt allows more than just entry to our home page, every API call entering the home page comes under a protected route. This is made sure by our authorization middleware which looks for the jwt in the headers of each request. This guarantees that even after getting in, any malicious user cannot have access to other users' data.
Whenever a user logs out, we clear the token from the local storage of the browser, having them sign in again to reset the cycle.

### Forgot password feature

![forgpass](https://github.com/khan168/USF_MarketPlace/assets/87687164/fe8879cb-6b80-4c65-a9b7-dd734a5001ca)


 An extension to the life cycle of our authentication is the forget password feature. To deal with that, we have the user mention their email. If the email is registered to our app, we send the user a one-time link to their email which re-routes them to the forget password page on our client server.



### One time link

![link](https://github.com/khan168/USF_MarketPlace/assets/87687164/1e74aae6-6638-4691-aafc-f294b13831ed)

The backend verifies the user email, and sends a link. The link consists of an id and a token in the url parameters. The token is the only one important here. The backend server, to create the  token,(here comes the main idea) uses the current, unchanged password as the secret key(secret key is used to create as well as decipher  the token). This token having the user’s unchanged password as secret key is what makes the link one time. When the user uses this link to change the password, the password has now changed in the db but not in the secret key of the token in the link(which uses the old forgotten password as secret key). Now why is the secret key imp? On reaching the front end using the link, another api call is made to decipher the token. The secret key which the frontend provides is the password from the db. So if the password has changed, the secret key to decipher it would now be different from the one in the link.
