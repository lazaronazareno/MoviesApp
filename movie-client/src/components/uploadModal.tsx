import React from "react"
import UploadMovies from "./moviesUpload"

export const UploadModal = () => {
  return (
    <>
      <button type="button" className="btn btn-lg btn-dark d-flex" data-bs-toggle="modal" data-bs-target="#uploadModal">
        Upload File
      </button>
      <div className="modal fade" id="uploadModal" tabIndex={-1} aria-labelledby="uploadModalLabel" >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title" id="uploadModalText">Upload new Database</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <UploadMovies />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}