import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Note: I pulled all of this from cloudinary's official website on how to use the cloudinary-react module.
 *
 * author: Cloudinary themselves, NOT ME
 * */
// class CloudinaryUploadWidget extends Component {
//   componentDidMount() {
//     const cloudName = Meteor.settings.public.cloudinary.cloud_name; // replace with your own cloud name
//     const uploadPreset = Meteor.settings.public.cloudinary.upload_preset; // replace with your own upload preset
//
//     // Remove the comments from the code below to add
//     // additional functionality.
//     // Note that these are only a few examples, to see
//     // the full list of possible parameters that you
//     // can add see:
//     //   https://cloudinary.com/documentation/upload_widget_reference
//
//     const myWidget = window.cloudinary.createUploadWidget(
//       {
//         cloudName: cloudName,
//         uploadPreset: uploadPreset,
//         cropping: true, // add a cropping step
//         // showAdvancedOptions: true,  //add advanced options (public_id and tag)
//         sources: ['local', 'url', 'camera'], // restrict the upload sources to URL and local files
//         multiple: false, // restrict upload to a single file
//         folder: 'profile_pictures', // upload files to the specified folder
//         tags: ['users', 'profile'], // add the given tags to the uploaded files
//         context: { alt: 'user_uploaded' }, // add the given context data to the uploaded files
//         clientAllowedFormats: ['images'], // restrict uploading to image files only
//         publicId: 'Xavier_Burt',
//         // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
//         // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
//         // theme: "purple", //change to a purple theme
//       },
//       (error, result) => {
//         if (!error && result && result.event === 'success') {
//           console.log('Done! Here is the image info: ', result.info);
//           document
//             .getElementById('uploadedimage')
//             .setAttribute('src', result.info.secure_url);
//         }
//       },
//     );
//     document.getElementById('upload_widget').addEventListener(
//       'click',
//       function () {
//         myWidget.open();
//       },
//       false,
//     );
//   }
//
//   render() {
//     return (
//       <button type="submit" id="upload_widget" className="cloudinary-button">
//         Upload
//       </button>
//     );
//   }
// }

const CloudinaryUploadWidget = ({ url, setUrl }) => {
  const setUrlTemp = (val) => {
    setUrl(val);
  };
  const myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: Meteor.settings.public.cloudinary.cloud_name,
      uploadPreset: Meteor.settings.public.cloudinary.upload_preset,
      cropping: true, // add a cropping step
      // showAdvancedOptions: true,  //add advanced options (public_id and tag)
      sources: ['local', 'url', 'camera'], // restrict the upload sources to URL and local files
      multiple: false, // restrict upload to a single file
      folder: 'profile_pictures', // upload files to the specified folder
      tags: ['users', 'profile'], // add the given tags to the uploaded files
      context: { alt: 'user_uploaded' }, // add the given context data to the uploaded files
      clientAllowedFormats: ['png', 'jpg'], // restrict uploading to image files only
      // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
      // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
      // theme: "purple", //change to a purple theme
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        setUrlTemp(result.info.secure_url);
      }
    },
  );
  return (
    <div style={{ borderRadius: '50%', border: 'darkgray', borderStyle: 'solid', width: '200px', height: '200px', overflow: 'hidden' }}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
      <img
        onClick={(e) => { e.preventDefault(); myWidget.open(); }}
        alt="Pfp"
        style={{ cursor: 'pointer', display: 'inline', margin: '0 auto', height: '100%' }}
        src={url}
        onError={(e) => { e.target.src = 'https://cdn.icon-icons.com/icons2/2645/PNG/512/person_circle_icon_159926.png'; }}
      /> <br />
    </div> // TODO Make this an AdvancedImage with Cloudinary
  );
};
CloudinaryUploadWidget.propTypes = {
  url: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired,
};
export default CloudinaryUploadWidget;
