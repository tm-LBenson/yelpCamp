# yelpCamp

YelpCamp is a full-stack web application for sharing and discovering campgrounds. Users can create, edit, and delete campgrounds, leave reviews, and explore campgrounds added by others. The application is built with Node.js, Express, MongoDB, and utilizes various middleware and libraries.

[Live Demo](https://yelp-camp-lewis.cyclic.app/):  
https://yelp-camp-lewis.cyclic.app/

## Features

- User registration and authentication
- Create, edit, and delete campgrounds
- Upload campground images
- Add, edit, and delete campground reviews
- Interactive campground map using Mapbox
- Responsive design
- Flash messages for user interaction
- Data validation and security measures

## Technologies

- Node.js
- Express
- MongoDB
- Mongoose
- EJS (Embedded JavaScript) templating engine
- Passport for authentication
- Joi for data validation
- Multer and Cloudinary for image uploading and storage
- Mapbox for displaying interactive maps
- Connect-flash for flash messages
- Helmet for security headers
- Sanitize-html for input sanitization

## Installation and Setup

1. Clone the repository or download the ZIP file.

```bash
git clone https://github.com/your_username/yelpcamp.git
```

2. Navigate to the project directory and install dependencies.

```bash
cd yelpcamp
npm install
```

3. Create a `.env` file in the project root directory and add the required environment variables.

```makefile
DB_URL=mongodb://localhost:27017/yelpCamp
SECRET=mysecret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
MAPBOX_TOKEN=your_mapbox_token
```

4. Start the development server.

```bash
npm start
```

5. Visit http://localhost:3000 in your browser to access the YelpCamp application.

## License

This project is open source and available under the MIT License.
