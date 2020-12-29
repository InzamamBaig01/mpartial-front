import React, { useEffect, useState, useCallback } from "react";
import InputMask from "react-input-mask";
import { Modal } from "react-bootstrap";
import dragimage from "assets/userProfile.svg";
import { useDropzone } from "react-dropzone";
import queryString from "query-string";
import { profileUpdate } from "utils/api-routes/api-routes.util";
import ReactCrop from "react-image-crop";
// import './EditProfile.css';

export const EditProfile: React.FC<any> = (props) => {
  /////////// Components States ////////////////////
  const [data, setData] = useState<any>({
    firstName: "",
    lastName: "",
    phonenumber: "",
    role: "",
    company: "",
    thetoken: localStorage.token,
  });
  const [profileImage, setProfileImage] = useState<any>({
    profilepicture: false,
    profileImage: false,
  });
  const [profileImageError, setProfileImageError] = useState<string | boolean>(
    false
  );
  const [croppedImageUrl, setCroppedImageUrl] = useState<any>("");
  const [crop, setCrop] = useState<any>({
    unit: "px",
    width: 150,
    height: 150,
    x: 50,
    y: 50,
  });
  const [imageSrc, setImageSrc] = useState<any>(null);
  const [imageEl, setImageEl] = useState<HTMLImageElement>();
  // src: null,
  /////////// Components States ////////////////////
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files

    const sFileName = acceptedFiles[0].name;
    const sFileExtension = sFileName
      .split(".")
      [sFileName.split(".").length - 1].toLowerCase();
    const iFileSize = acceptedFiles[0].size;

    /// OR together the accepted extensions and NOT it. Then OR the size cond.
    /// It's easier to see this way, but just a suggestion - no requirement.
    if (
      !(
        sFileExtension === "jpg" ||
        sFileExtension === "jpeg" ||
        sFileExtension === "png"
      )
    ) {
      /// 10 mb
      setImageSrc(0);

      setProfileImageError("ext");
    } else if (iFileSize > 5485760) {
      setProfileImageError("size");
      setImageSrc(null);
    } else {
      setProfileImageError(false);
      setProfileImage({
        profilepicture: acceptedFiles[0],
        profileImage: URL.createObjectURL(acceptedFiles[0]),
      });
    }
    console.log(acceptedFiles[0]);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImageSrc(reader.result);
    });
    console.log(acceptedFiles[0]);
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    setData({
      firstName: props.info.firstName,
      lastName: props.info.lastName,
      phonenumber: props.info.phone,
      role: props.info.role,
      company: props.info.companyname,
      // profilepicture: false,
      // profileImage: false,
      thetoken: localStorage.token,
    });
    setProfileImage({
      profilepicture: false,
      profileImage: props.info.profilePicture
        ? props.info.profilePicture
        : false,
    });
  }, [props.info]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const profilePic = profileImage.profileImage;
    const stringified = queryString.stringify(data);

    // formData.append("profilepicture", profileImage.profilepicture);
    profileUpdate(stringified, profilePic).subscribe((response) => {
      if (response.response.Requested_Action) {
        props.onSubmitSuccess();
        setProfileImage({
          profilepicture: false,
          profileImage: false,
        });
      }
    });
  };
  const validateChange = () => {
    return (
      data.firstName == props.info.firstName &&
      data.lastName == props.info.lastName &&
      data.phonenumber == props.info.phone &&
      profileImage.profileImage == false
    );
  };

  // If you setState the crop in here you should return false.
  const onImageLoaded = (image) => {
    // this.imageRef = image;
    // console.log(image);
    setImageEl(image);
    // console.log(imageSrc);
  };

  const onCropComplete = (crop) => {
    makeClientCrop(crop);
  };

  const onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    // this.setState({ crop });
    setCrop(crop);
  };

  const makeClientCrop = async (crop) => {
    if (imageEl && crop.width && crop.height) {
      // console.log(imageEl);
      const croppedImageUrl = await getCroppedImg(
        imageEl,
        crop,
        "newFile.jpeg"
      );
      setCroppedImageUrl(croppedImageUrl);
      setProfileImage({ ...profileImage, profileImage: croppedImageUrl });
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    // console.log(image, crop, fileName);
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    canvas
      .getContext("2d")
      ?.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

    // return new Promise((resolve, reject) => {
    //   canvas.toBlob((blob) => {
    //     if (!blob) {
    //       //reject(new Error('Canvas is empty'));
    //       console.error("Canvas is empty");
    //       return;
    //     }
    //     let fileUrl = "";
    //     blob.name = fileName;
    //     window.URL.revokeObjectURL(fileUrl);
    //     fileUrl = window.URL.createObjectURL(blob);
    //     resolve(fileUrl);
    //   }, "image/jpeg");
    // });
    return canvas.toDataURL("image/jpeg");
  };
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result);
      });
      console.log(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        className="edit_profile"
      >
        <Modal.Header closeButton>
          <Modal.Title className="add_card_title">Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="support_body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={data.firstName}
                    required
                    onChange={(e) =>
                      setData({
                        ...data,
                        firstName: e.currentTarget.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={data.lastName}
                    required
                    onChange={(e) =>
                      setData({
                        ...data,
                        lastName: e.currentTarget.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Cell</label>

                  <InputMask
                    mask="999-999-9999"
                    onChange={(e) =>
                      setData({
                        ...data,
                        phonenumber: e.currentTarget.value,
                      })
                    }
                    value={data.phonenumber}
                  >
                    {(inputProps) => (
                      <input
                        type="text"
                        className="form-control"
                        {...inputProps}
                        required
                      />
                    )}
                  </InputMask>
                </div>
                {props.info.subscriptionstatus === "NotActive" ? (
                  ""
                ) : (
                  <div className="form-group">
                    <label>Company Name</label>

                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        setData({
                          ...data,
                          company: e.currentTarget.value,
                        })
                      }
                      value={data.company}
                    ></input>
                  </div>
                )}
              </div>
              <div className="col">
                <div className="form-group">
                  <label>Profile Picture</label>
                  <div>
                    {/* <input type="file" accept="image/*" onChange={ onSelectFile } /> */}
                    {profileImage.profileImage ? (
                      <>
                        <div className="profile_image_preview">
                          <div
                            className="cross_icon"
                            onClick={() =>
                              setProfileImage({
                                profilepicture: false,
                                profileImage: false,
                              })
                            }
                          >
                            &times;
                          </div>
                          <img
                            src={profileImage.profileImage}
                            alt="profile_image"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          {...getRootProps()}
                          className="upload_profile_picture"
                        >
                          <input {...getInputProps()} accept="image/jpeg" />
                          {isDragActive ? (
                            <p>
                              <img src={dragimage} alt="" />
                            </p>
                          ) : (
                            <p>
                              <img src={dragimage} alt="" />
                            </p>
                          )}
                        </div>
                        {profileImageError == "size" ? (
                          <p className="profile_upload_image_info">
                            Uploaded file exceeds size limit, please upload
                            image lower than 5MB
                          </p>
                        ) : (
                          ""
                        )}
                        {profileImageError == "ext" ? (
                          <p className="profile_upload_image_info">
                            Invalid file extention.
                          </p>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </div>
                  {/* ////// Cropped Working //////////////// */}
                  {/* { croppedImageUrl && (
										<img alt="Crop" style={ { maxWidth: '100%' } } src={ croppedImageUrl } />
									) } */}
                  {imageSrc && (
                    <>
                      <ReactCrop
                        src={profileImageError ? "" : imageSrc}
                        crop={crop}
                        onImageLoaded={onImageLoaded}
                        onComplete={onCropComplete}
                        onChange={onCropChange}
                        //locked={true}
                      />
                      {croppedImageUrl && (
                        <div className="image-crop-action-container">
                          <button
                            className="btn image-crop-action-btn"
                            type="button"
                            onClick={() => {
                              setProfileImage({
                                profilepicture: false,
                                profileImage: false,
                              });
                              setCroppedImageUrl();
                              setImageSrc(null);
                            }}
                          >
                            {" "}
                            Cancel{" "}
                          </button>
                          <button
                            className="btn image-crop-action-btn"
                            type="button"
                            onClick={() => {
                              //console.log(croppedImageUrl);
                              setProfileImage({
                                profilepicture: croppedImageUrl,
                                profileImage: croppedImageUrl,
                              });
                              setImageSrc(null);
                            }}
                          >
                            {" "}
                            OK{" "}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                  {/* ////// Cropped Working ///////////////									 */}
                </div>
              </div>
            </div>
            <div className="form-group edit_profile_submit_container">
              <button
                className="btn edit_profile_submit"
                type="submit"
                id="formButton"
                disabled={validateChange()}
              >
                Update
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
