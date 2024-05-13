

#  <div align="center">StockBook </div>

\
&nbsp;

## Introduction

Welcome to my repository that represents StockBook website.

It is a stock blog website that allows users to add their stock blogs, news, order and earning events. Encourage users for more interaction to increase stock movement in the stock market.

 This repository contains the code for building a modern and responsive website using React for frontend and Django-rest for backend development.

<p align="center">
<img src="documentation/amiresponsive.png" alt="amiresponsives">
</p>

Visit [StockBook website](https://stock-book-7c5f07440d68.herokuapp.com/) website

Visit [StockBook GitHub Repository](https://github.com/Ahmadalhindi/stockbook)

- - -

\
&nbsp;

## Table of Contents

- [Introduction](#introduction)
- [User Experience](#user-experience)
  - [Site Objectives](#site-objectives)
  - [Target Audience](#target-audience)
- [Structure](#structure)
  - [Entity-Relationship Diagram ERD](#entity-relationship-diagram-erd)
  - [API Models](#api-models)
  - [Agile Methodology](#agile-methodology)
  - [React Reusable Components](#react-reusable-components)
- [Skeleton](#skeleton)
  - [Wireframes](#wireframes)
  - [Fonts](#fonts)
  - [Responsive Screens](#responsive-screens)
- [Features](#features)
  - [All pages](#all-pages)
  - [Homepage](#homepage)
  - [Post Detail](#post-detail)
  - [Sign Up](#sign-up)
  - [Sign Out](#sign-out)
  - [Admin Panel](#admin-panel)
- [Technologies Used](#technologies-used)
- [Testing](#testing)
- [Bugs](#bugs)
  - [Fixed Bugs](#fixed-bugs)
  - [Unfixed Bugs](#unfixed-bugs)
- [Deployment](#deployment)
- [Credits](#credits)

\
&nbsp;

- - -

## User Experience

### Site Objectives
- Blog platform divided into two sections:
  - Stock post: share the stock news, transactions with ability to attach image or chart.
  - Earning event: share the earning date for a stock.
- Encourage friendly interactions for financial and social goals through:
  - Add comments in stock posts.
  - Click counted bull as a buy or bear as a sell in stock posts.
- Profile books that allow users to follow or unfollow other user profiles to feed on their posts and stock movements.
- The permission for functionality limited accordingly:
  - Unregistered user: Only view most of the site without interactions of above objectives.
  - Registered user: Full accessibility and interactions.
- Perform search in stock and earning pages and search with selection of stock for a specific sector from 11 categorized GICS*.

*GICS: Global Industry Classification Standard

### Target Audience
- Users and investors that are interested in the stock market.
- New investors who are seeking guidance and tips in investing.
- Investors that are sharing their experiences and transactions and news of stocks.
- Traders that are trying to gain an advantage from stock sentiment as a signal to buy or sell.

[Back to table of Contents](<#table-of-contents>)

\
&nbsp;

## Structure

### Entity-Relationship Diagram ERD

<p align="center">
<img src="erd.png" alt="Entity-Relationship Diagram">
</p>

### API Models

1.	Profile Model:
- Purpose: Represents user profiles, providing information like name, biography, and profile image.
- Attributes:
  - owner:
  One-to-one relationship with the User model representing the user who owns the profile.
  - created_at: DateTimeField indicating when the profile was created.
  - updated_at: DateTimeField indicating when the profile was last updated.
  - name: CharField representing the name of the user.
  - bio: TextField for a brief biography of the user.
  - image: ImageField for the profile image of the user.
2.	Stock Model:
- Purpose: Represents stocks owned by users, storing details such as title, symbol, company name, sector, order type, etc.
- Attributes:
  - Similar to Profile model, it has owner with ForeignKey relationship with the User model, created_at, and updated_at fields.
  - Other fields include title, symbol, company_name, sector, order, order_date, order_price, quantity, content, and image.
  - order_choices and sector_choices provide options for the order type and sector respectively.

3.	Earning Model:
- Purpose: Stores earnings data associated with stocks.
- Attributes:
  - owner: ForeignKey relationship with the User model.
  - created_at: DateTimeField indicating when the earnings data was created.
  - updated_at: DateTimeField indicating when the earnings data was last updated.
  - ticker: CharField representing the ticker symbol of the associated company.
  - earning_date: DateField indicating when the earnings were reported.
4. & 5.	Bear Model and Bull Model:
- Purpose: Represent entities associated with users and stocks, indicating pessimistic (bear) or optimistic (bull) sentiment towards a stock.
- Attributes:
  - owner: ForeignKey relationship with the User model.
  - stock: ForeignKey relationship with the Stock model.
  - created_at: DateTimeField indicating when the entity was created.
  - These models help track sentiment towards stocks among users.
6.	Comment Model:
- Purpose: Represents comments made by users on stocks.
- Attributes:
  - owner: ForeignKey relationship with the User model.
  - stock: ForeignKey relationship with the Stock model.
  - created_at: DateTimeField indicating when the comment was created.
  - updated_at: DateTimeField indicating when the comment was last updated.
  - content: TextField representing the content of the comment.
7.	Follower Model:
- Purpose: Represents the relationship between users where one user follows another.
- Attributes:
  - owner: ForeignKey relationship with the User model, representing the user who follows.
  - followed: ForeignKey relationship with the User model, representing the user being followed.
  - created_at: DateTimeField indicating when the relationship was created.

### Agile Methodology 
Milestones & User Stories:

The stock-book project was developed with 6 milestones and each contains their user stories that labeled according to its priority:

Link to the [stock-book project](https://github.com/users/Ahmadalhindi/projects/12).


<p align="center">
<img src="documentation/milestones.png" alt="stock-book Milestones">
</p>

<p align="center">
<img src="documentation/project.png" alt="stock-book project">
</p>

#### Milestone: Backend stock-book

| <div align="center">#</div> | <div align="center">User Story</div> |  <div align="center">User/Registered user/Admin</div> | <div align="center">Content</div> | <div align="center">Label</div> |
| :------: | :------: | :------: | ------ | :------: |
| [1](https://github.com/Ahmadalhindi/stockbook/issues/9) | Admin user name and password | Admin  | I want to be able to create an admin name and password so I can have full control of the backend. | <span style="color:red">Must have</span> |
| [2](https://github.com/Ahmadalhindi/stockbook/issues/9) | User Profile | Admin | I want to be able to access and edit User's Profile so I can manage user authentication and permission. | <span style="color:red">Must have</span> |
| [3](https://github.com/Ahmadalhindi/stockbook/issues/9) | Profiles app | Admin | I want to be able to have full control of profiles app on backend so I can allow user to access and manage their profiles on frontend. | <span  style="color:red">Must have</span> |
| [5](https://github.com/Ahmadalhindi/stockbook/issues/9) | Stocks app | Admin | I want to be able to have full control of stock app on backend so I can allow users for the best use and edit their stocks transactions on frontend. | <span style="color:red">Must have</span> |
| [6](https://github.com/Ahmadalhindi/stockbook/issues/9) | Comments app | Admin | I want to be able to have full control of comments app on backend so I can allow users for the best use and edit their comments on frontend. | <span style="color:red">Must have</span> |
| [7](https://github.com/Ahmadalhindi/stockbook/issues/9) | Bulls app | Admin | I want to be able to have full control of bull app on backend so I can allow users for the best use of bull button on frontend. | <span style="color:red">Must have</span> |
| [8](https://github.com/Ahmadalhindi/stockbook/issues/9) | Bears app | Admin |  I want to be able to have full control of bears app on backend so I can allow users for the best use of bear button on frontend. | <span style="color:red">Must have</span> |
| [10](https://github.com/Ahmadalhindi/stockbook/issues/9) | Followers app | Admin | I want to be able to have full control of followers app on backend so I can allow users for the best use by adding their followers on frontend. | <span style="color:red">Must have</span> |
| [11](https://github.com/Ahmadalhindi/stockbook/issues/9) | Search and filter equipment | Admin |  I want to be able to create search and filter equipment on backend so I can allow users find particular content more easily on frontend. | <span style="color:yellow">Should have</span> |

#### Milestone: Frontend - Navigation

| <div align="center">#</div> | <div align="center">User Story</div> |  <div align="center">User/Registered user/Admin</div> | <div align="center">Content</div> | <div align="center">Label</div> |
| :------: | :------: | :------: | ------ | :------: |
| [12](https://github.com/Ahmadalhindi/stockbook/issues/9) |  Navigation Bar | User | I want to reach the navigation bar at the top of the page so I can navigate between the pages freely. | <span style="color:red">Must have</span> |
| [13](https://github.com/Ahmadalhindi/stockbook/issues/9) | Fixed Navigation | user | I want to see nav bar in every page so I can navigate any page without go back to the home page. | <span style="color:yellow">Should have</span> |
| [14](https://github.com/Ahmadalhindi/stockbook/issues/9) | Registration and Login Status | Registered User | I want to be able to be aware of my registration and login status in the nav bar so I can make fast action for registration  or log out for protection. | <span  style="color:red">Must have</span> |

#### Milestone: Frontend - User Accessibility


| <div align="center">#</div> | <div align="center">User Story</div> |  <div align="center">User/Registered user/Admin</div> | <div align="center">Content</div> | <div align="center">Label</div> |
| :------: | :------: | :------: | ------ | :------: |
| [15](https://github.com/Ahmadalhindi/stockbook/issues/9) | registration | User | I want to be able to have full control of stock app on backend so I can allow users for the best use and edit their stocks transactions on frontend. | <span style="color:red">Must have</span> |
| [16](https://github.com/Ahmadalhindi/stockbook/issues/9) | Sign in/out | Registered User | I want to be able to sign in to my account so I can get full advantages and the best use of the site. | <span style="color:red">Must have</span>  |
| [17](https://github.com/Ahmadalhindi/stockbook/issues/9) | Refreshing Access Tokens | Registered User | I want to be able to maintain my logged-in status until I choose to log out capability so I can have best use and my experience is not compromised. | <span style="color:red">Must have</span> |

#### Milestone: Frontend - Stock Posts

| <div align="center">#</div> | <div align="center">User Story</div> |  <div align="center">User/Registered user/Admin</div> | <div align="center">Content</div> | <div align="center">Label</div> |
| :------: | :------: | :------: | ------ | :------: |
| [18](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/7) | Create a new Stock Post | Registered User | I want to be able to add a new stock post so I can publish it for others to see and interact with it. | <span style="color:red">Must have</span> |
| [19](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/8) | Add Stock Details and Transaction. | Registered User | I want to be able to add the details and the transaction of the stock so I can give more attention to the volume and my portfolio. | <span style="color:red">Must have</span> |
| [20](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/8) | Add Stock Chart and News | Registered User | I want to be able to add a chart image and news for the stock post so I can share more knwoledge about stock indicators within the chart. | <span style="color:yellow">Should have</span> |
| [22](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/8) | Edit/Delete Stock Post | Registered User | I want to to be able to make any changes in my stock post details so I can add more information or correct any details or delete the post. | <span style="color:red">Must have</span> |
| [26](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/8) | Search Stocks by Keywords | User | I want to to be able to search for stock posts (symbol, order, user name ..) so I can Easily find the subject that I'm interested in. | <span style="color:yellow">Should have</span> |
| [44](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/8) | Filter Stocks by Sector | Registered User | I want to be able to filter the stocks according to sector so I can easily view all stocks that belong to the sector that I like most. | <span style="color:green">Nice to have</span>

#### Milestone: Frontend - Home Page

| <div align="center">#</div> | <div align="center">User Story</div> |  <div align="center">User/Registered user/Admin</div> | <div align="center">Content</div> | <div align="center">Label</div> |
| :------: | :------: | :------: | ------ | :------: |
| [23](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/8) | Top Appearing Stock | User | I want to be able to view most recent posts so I can be up to date and select the new stock quickly. | <span style="color:yellow">Should have</span> |
| [24](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/7) | View All Stock Posts | User | I want to be able to view all stock posts so I can select the stock directly after entering the home page. | <span style="color:red">Must have</span> |
| [25](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/8) | Keep Scrolling |  User | I want to be able to keep scrolling throught all stock posts so I can have unstoppable scrolling without any distraction. | <span style="color:green">Nice to have</span> |

#### Milestone: Frontend - Communication

| <div align="center">#</div> | <div align="center">User Story</div> |  <div align="center">User/Registered user/Admin</div> | <div align="center">Content</div> | <div align="center">Label</div> |
| :------: | :------: | :------: | ------ | :------: |
| [27](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/8) | Create a Comment | Registered User | I want to be able to Create my own comments so I can share my thoughts and interact with others. | <span style="color:red">Must have</span> |
| [28](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/7) | Edit a Comment | Registered User | I want to be able to edit my comments so I can reform and make best changes to my comments. | <span style="color:red">Must have</span> |
| [29](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/8) | Delete a Comment | Registered User | I want to be able to delete my comment so I can get rid of unwanted comments. | <span style="color:red">Must have</span>
| [30](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/8) | View Comments |  User | I want to be able to view all comments in the stock post so I can see the reaction of others about every stock post. | <span style="color:red">Must have</span> |
| [31](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/7) | Click Bull for a Stock | Registered User | I want to be able to click bull button for a stock so I can represent my thought about stock price and push the stock order to buy related to a stock post. | <span style="color:red">Must have</span> |
| [32](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/8) | Click Bear in Stock Posts | Registered User | I want to be able to click bear button for a stock so I can represent my thought about stock price and push the stock order to sell for a stock post. | <span style="color:red">Must have</span>

#### Milestone: Frontend - User Profile Page

| <div align="center">#</div> | <div align="center">User Story</div> |  <div align="center">User/Registered user/Admin</div> | <div align="center">Content</div> | <div align="center">Label</div> |
| :------: | :------: | :------: | ------ | :------: |
| [33](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/8) | Filter Stocks by Followed Users | Registered User | I want to be able to view stocks of followed users so I can keep track with their new publishing. | <span style="color:green">Nice to have</span> |
| [36](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/8) | View Users Profiles |  User | I want to be able to view users profiles so I can know more about them and their stock. | <span style="color:red">Must have</span> |
| [37](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/7) | Follow/Unfollow Users | Registered User | I want to be able to follow or unfollow users so I can keep track with followed. | <span style="color:red">Must have</span> |
| [38](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/8) | Edit profile | Registered User | I want to be able to edit my profile so I can update my profile with new image and bio. | <span style="color:red">Must have</span>
| [39](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/8) | View User Profile Statistics | User | I want to be able to view the last user statistics (bio, number of posts, follows, users followed, bulls stocks and bears stocks) so I can know more about them and their stocks orders. | <span style="color:yellow">Should have</span> |
| [40](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/8) | Most followed profiles | Registered User | I want to be able to view most followed profiles so I can know which profiles are popular. | <span style="color:green">Nice to have</span> |

#### Milestone: Frontend - Bulls and Bears

| <div align="center">#</div> | <div align="center">User Story</div> |  <div align="center">User/Registered user/Admin</div> | <div align="center">Content</div> | <div align="center">Label</div> |
| :------: | :------: | :------: | ------ | :------: |
| [34](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/7) | View Bulls in Stock | Registered User | I want to see stocks that I clicked for bull so I can decide which stock I need to buy. | <span style="color:green">Nice to have</span> |
| [35](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/8) | View Bears in stocks | Registered User | I want to see stocks that I clicked for bear so I can decide which stock I need to sell. | <span style="color:green">Nice to have</span>

#### Milestone: Frontend - Earning Events

| <div align="center">#</div> | <div align="center">User Story</div> |  <div align="center">User/Registered user/Admin</div> | <div align="center">Content</div> | <div align="center">Label</div> |
| :------: | :------: | :------: | ------ | :------: |
| [41](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/8) | Create a new Earning event | Registered User |  I want to be able to add a new earning for a stock so I can publish it for others to see and interact with it. | <span style="color:red">Must have</span> |
| [42](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/8) | Edit/Delete Earning | Registered User | I want to be able to make any changes in my earning details so I can add more information or correct any details or delete the event. | <span style="color:red">Must have</span> |
| [43](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/7) | View All Earning events | User | I want to be able to view all earning events so I can select to see the earning that I like. | <span style="color:red">Must have</span> |
| [45](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/9) | Search Earning Event by keyword | User |  I want to be able to search earning events by ticker stock or user so I can easily find the earning that I'm interested without scrolling the page. | <span style="color:yellow">Should have</span> |

### User stories (Ignored status): for lack ot times

| <div align="center">#</div> | <div align="center">User Story</div> |  <div align="center">User/Registered user/Admin</div> | <div align="center">Content</div> | <div align="center">Label</div> |
| :------: | :------: | :------: | ------ | :------: |
| [4](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/5) | Portfolio app | Admin | I want to be able to have full control of Portfolio app on backend so I can allow users for the best use and edit Portfolio on frontend. | <span style="color:lightblue">Nice to have & Ignored</span>  |
| [9](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/10) | Likes app | Admin | I want to be able to have full control of likes app on backend so I can allow users to add or remove their likes on frontend. | <span style="color:lightblue">Nice to have & Ignored</span> |
| [21](https://github.com/Ahmadalhindi/lithium-battery-recycle-blog/issues/7) | Auto adding Default Image Related to the Stock Order | Registered User | I want to be able to add image or leave it as default so I can give more attention about my stock order wither is it hold: bull and bear image or buy: bull image or sell: bear image. | <span style="color:lightblue">Nice to have & Ignored</span> |

### React Reusable Components

#### Asset component: Asset.js

This component is rendering a spinning animation, to indicate that something is loading or processing in the background. It will provide feedback to users that an action is being performed and to prevent them from feeling like the application is unresponsive.

Used in stock, earning, comment, profile pages and popular profiles including search and select sector menu.

#### Avatar component: Avatar.js

This component is used in stock, earning, comment, profile, nav bar and in creating comment to render an image profile.

#### Three Dots Dropdown Menu: MoreDropdown.js

This component imported in stock, earning and comment to help users for select edit or delete as dropdown menu when clicking on the three dots.

Also give function in profile page as ProfileEditDropdown to select edit profile, change username, or change password as dropdown menu when clicking on the three dots.

#### Navbar component: NavBar.js

This component is used to render the navbar across the respective pages of the app.

#### Not Found Component: NotFound.js
This component will work when a page is not found, 404 alert.


[Back to contents](<#contents>)

\
&nbsp;


# Skeleton
## Wireframes
- Home page/Stocks page:
<p align="center">
<img src="documentation/wireframes-homepage.png" alt="Entity-Relationship Diagram">
</p>

- Earnings page:
<p align="center">
<img src="documentation/wireframe-earningspage.png" alt="Entity-Relationship Diagram">
</p>

## Fonts
- Montserrat, sans-serif: Montserrat Weight: 100 – 900

Montserrat is a good font to use due to its modern design, readability, and wide availability.

## Responsive Screens
The website delivers a consistent and user-friendly experience across a wide range of devices, contributing to improved usability and accessibility.


### Breakpoints
- **Desktop**: 992px and above
  - Navigation bar with visibility for logo and Add menu and all items.
  - Grid layout adjusts to accommodate larger screen sizes.
- **Tablet**: 768px - 991px
  - Navigation bar: Items and add menu may collapse to a burger drop down menu.
  - Stocks and the most followed list will be adjust vertically.
- **Mobile**: Below 768px
  - Navigation bar: the Logo and the burger icon will vertically align.
  - Content stacks vertically for easier scrolling on smaller screens.

- - -

[Back to table of Contents](<#table-of-contents>)

\
&nbsp;

## Navigation Bar
Intuitive, efficient, and located on top of all pages for helping users find the information they're looking for quickly and easily.

- Logo: It is created as a brand image positioned at the left-hand side. Contains text that represents the name of the website and the letter "O" replaced by an icon to illustrate the communication. Clicking on the logo directs users back to the homepage.

<p align="center">
<img src="documentation/logo.png" alt="logo">
</p>

- Logged out user:
  - Homepage, Earning on the left
  - Sign in, Sign up on the right

<p align="center">
<img src="documentation/nav-bar.png" alt="nav_bar">
</p>


- Logged in user:
  - Homepage, Earning, Add menu on the left
  - Feed, Bulled, Beared, Sign out, Profile on the right

<p align="center">
<img src="documentation/nav-bar-registered.png" alt="nav-bar-registered">
</p>

<p align="center">
<img src="documentation/add-menu.png" alt="add-menu">
</p>

- Responsive - small screen:

  - Auto-close the toggle menu when clicking outside the toggle menu.

  - Auto-close the toggle menu when clicking on the links in the toggle menu and the links inside the add dropdown menu.

  - Auto-close will not work when clicking on the add dropdown menu

<p align="center">
<img src="documentation/burger-menu.png" alt="burger-menu">
</p>

## Sign up page:
Form for registration with proper validation warnings and link to sign in for already registered users.

<p align="center">
<img src="documentation/sign-up.png" alt="nav_bar">
</p>

## Sign in page:
Form to sign in for registered users with proper validation warnings and link to sign up if the user not registered yet.

<p align="center">
<img src="documentation/sign-in.png" alt="nav_bar">
</p>

## Home page/all Blog page:

Visit the page by clicking on the logo or Home item.

The stocks are sorted by the recent created stocks.

<p align="center">
<img src="documentation/homepage.png" alt="nav_bar">
</p>

## Most Followed Profiles:
List Sorted by the most followed profiles and the ability to follow up or unfollow as buttons for registered users.

The list showed in the above image in the home page section.


## Stock page:
Visit the stock by clicking on the image or the comment icon.

- Profile details: username author and the profile image
- Chart or stock image
- Stock details: title, symbol, company name, sector, order, content ...etc.
- Bulled (optimistic: buy) or Beared (pessimistic: sell)
  - All users can view the sum number beside the beared and bulled icons.
  - Logged in users only can select between pessimistic (beared) or optimistic (bulled) sentiment towards a stock - can't select both. Also, they can unselect by clicking again on the icon they selected before.
  - prevent the logged out users from selecting with proper validation  warning when clicked.
  - prevent the selection for the authors of the same stock with proper validation warning when clicked.

<p align="center">
<img src="documentation/bulled-beared-comment.png" alt="nav_bar">
</p>

- Comments:
   - All users can view the comments.
   - Only logged in users can add/edit/delete their comments on a stock.

<p align="center">
<img src="documentation/comments.png" alt="nav_bar">
</p>

<p align="center">
<img src="documentation/edit-comment.png" alt="nav_bar">
</p>
 
Only logged in users can create/edit/delete their own stocks by clicking on Add menu in the nav bar then select Stock post.

Only logged in users can edit/delete their own stocks by clicking on three dots in the stock and select edit/delete.

<p align="center">
<img src="documentation/three-points.png" alt="nav_bar">
</p>

 - On create/edit stock page can the logged in users preview their image before confirm create/edit

 <p align="center">
<img src="documentation/preview-image.png" alt="nav_bar">
</p>

<p align="center">
<img src="documentation/create-stock.png" alt="nav_bar">
</p>

 - On create/edit stock page can throw proper validation warnings error for image size/height/width or when filling text.

 ## All Earning events page:
Visit the page by clicking on the Earning item in the nav bar.

The earnings are sorted by the nearest earning date.


 ## Earning event page:
 Visit the earning by clicking on the ticker on the earning.

- Profile details: username author and the profile image.
- Ticker: the ticker symbol of the stock.
- Earning date: the earning date that is declared for the stock.

<p align="center">
<img src="documentation/earning.png" alt="nav_bar">
</p>

Only logged in users can create/edit/delete their own stocks by clicking on Add menu in the nav bar then select Stock post.

On create/edit stock page can throw proper validation warnings error for submit the content.

<p align="center">
<img src="documentation/create-earning.png" alt="nav_bar">
</p>

## Profile Page:
All users can view profile users by clicking on the profile image or username in the stock or in the earning or from list of most followed profiles.

Profile auto-created when the user signs up with default profile image.

- Username
- Profile image
- Profile statistics:
  - Sum numbers of the stocks.
  - Sum number of followers.
  - Sum number of the following.
- Bio
- Stocks posted by users.

<p align="center">
<img src="documentation/profile.png" alt="nav_bar">
</p>

The registered user can visit the edit/change username/change password pages from the three dots menu on the owner profile page as image above.

The edit pages follow the validation rules with throwing proper warning errors.

## Feed, Bulled and Beared pages:

Those pages are limited to the logged in users.

- Feed page: Represents the stocks of the users that are being followed.
- Bulled page: Represents the bulled stocks.
- Beared page: Represents the beared stocks.

## Search And select menu:
- In all stocks page, all users can search by keyword as it displayed under.

<p align="center">
<img src="documentation/search-stock.png" alt="nav_bar">
</p>

- In all earnings page, all users can search by keyword as it displayed under.

<p align="center">
<img src="documentation/search-earning.png" alt="nav_bar">
</p>

- In all stocks page, all users can select all sectors or a specific sector from 11 categorized GICS sectors in dropped down menu.

<p align="center">
<img src="documentation/select-menu.png" alt="nav_bar">
</p>

[Back to table of Contents](<#table-of-contents>)

\
&nbsp;

## Technologies Used

### Languages
- HTML5 & CSS3
- Python 
- JavaScript
- JSX/React

### Framework, Libraries and Tools
- [django REST Framework](https://www.django-rest-framework.org/) A powerful toolkit for building web APIs
- [django Allauth](https://docs.allauth.org/en/latest/)
- [django-filter](https://django-filter.readthedocs.io/en/stable/) Adding search functionality to serializers
- [django-extensions](https://django-extensions.readthedocs.io/en/latest/)
- [django-cors-headers](https://pypi.org/project/django-cors-headers/)
- [react-bootstrap](https://react-bootstrap.netlify.app/) dynamic front-end framework that combines the power of React, a popular JavaScript library, with Bootstrap
- react-infinite-scroll-component
- react-responsive
- react-router-dom
- react-scripts
- react-select
- [JWTDecode](https://www.npmjs.com/package/jwt-decode)
- [Axios](https://axios-http.com/docs/intro) - HTTP Client for the browser and Node.js
- [Node](https://nodejs.org/en) Used as package manager to install dependencies
- [cloudinary](https://cloudinary.com/ "cloudinary") Used to store website's images.
- [elephandSQL](https://www.elephantsql.com/) Used to store and manage PostgreSQL database.
- [Pillow](https://python-pillow.org/) Used for adding image processing capabilities
- [whitenoise](https://whitenoise.readthedocs.io/en/stable/django.html) Allows web app to serve its own static files
- [gitpod](https://www.gitpod.io/ "gitpod") Used as the development to build the page.
- [gitHub](https://github.com/ "gitHub") The project’s Version Control Management System.
- [psycopg2](https://pypi.org/project/psycopg2/ "google Fonts") Is the popular PostgreSQL adapter used in  Python.
- [gunicorn](https://gunicorn.org/ "gunicorn") Allows to run multiple Python processes within a single dyno
- [django-extensions](https://pypi.org/project/django-extensions/ "django-extensions") Add functionality to the project.
- [django-allauth](https://docs.allauth.org/en/latest/ "django-allauth") Addressing authentication, registration, account management as well as 3rd party (social) account authentication.
- [django-summernote](https://github.com/summernote/django-summernote/blob/main/README.md "django-summernote") Support admin mixins and widgets.
- [graphviz](https://graphviz.org/ "Graphviz") Set of tools for visualizing graph data, ERD in our project.
- [pyparsing](https://pypi.org/project/pyparsing/ "pyparsing") Library for parsing text strings.
- [pydot](https://pypi.org/project/pydot/ "pydot") Library for creating, manipulating, and visualizing graphs in DOT format.
- [looka](https://looka.com/ "lookas") Create and design the logo.
- [font awesome](https://looka.com/ "font awesome") Add Icons to the project.
- [cloud convert](https://cloudconvert.com/jpeg-to-webp "cloudconvert") Used to convert images to WEBP.
- [Heroku](https://id.heroku.com/ "Heroku") Used to deploy the project.
- [Balsamiq](https://balsamiq.com/) for creating the wireframes
- [google fonts](https://fonts.google.com/ "google Fonts")  for fonts used in the site.
- [tinypng](https://tinypng.com/) Smart WebP, PNG compression to boost the website.


[Back to table of Contents](<#table-of-contents>)
\
&nbsp;

## Testing

Click on provided link to visit the [Test](TEST.md) page.
\
&nbsp;

## Bugs

### Fixed Bugs
- **Getting a 401 when trying to login**:

  Changing CLIENT_ORIGIN_DEV in env.py to the local host that configured in package.json.
  Removing the trailing slash from the last entry in the CSRF_TRUSTED_ORIGINS settings.

- **EarningPage doesn't seem to be rendering**

   Add the missing trailing slash at the end of:
   /earnings/${id}

- **Can't resolve react-router**

   Run npm install react-scripts@latest in the terminal to install the latest version.

   Run npm install in the terminal to update the package-lock.json file.

   Change the proxy to: http://127.0.0.1:8000, and added to ALLOWED_HOSTS

### Unfixed Bugs
For the lack of time.

- The profile bio not displayed.
- Errors displayed when refreshing the website or click on sign up/in. But these cause no harm or are unfunctional if not fixed.

<p align="center">
<img src="documentation/errors.png" alt="errors">
</p>


[Back to table of Contents](<#table-of-contents>)

\
&nbsp;


## Deployment

Steps of deploying to Heruko:

Click on 'Create new app' Then write the name of the project.

Select your region.

Click on 'Create App'.

Update the 'Config Vars' located in the 'setting' tab with the following:
- ALLOWED_HOST
- CLIENT_ORIGIN

In the 'deploy' tab select 'GitHub' then search and connect 
to the repository.

In the end of the 'deploy' tab page at 'Manual Deployment'  click on the 'Deploy Branch'.

[Back to table of Contents](<#table-of-contents>)

\
&nbsp;

## Credits

- [code institute](https://learn.codeinstitute.net/login?next=/ "code institute"): Django REST framework, Moments 
- [stack overflow](https://stackoverflow.com/ "stack overflow")
- [Tech with Tim - youtub](https://www.youtube.com/@TechWithTim)
- [react-bootstrap](https://react-bootstrap.netlify.app/) Nav bar - Form
- [Suraj Katwal - wplogout](https://www.wplogout.com/export-database-diagrams-erd-from-django/?unapproved=4810&moderation-hash=1f8e0dda1465cb535b42a74c3759eed6#comment-4810 "wplogout"): Export ERD from Django.
\
&nbsp;

[Back to top](<#introduction>)