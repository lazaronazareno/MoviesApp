import React from "react"
import { SearchMovie } from "./searchMovies"

export const SearchModal = () => {
  return (
    <>
      <button type="button" className="btn btn-lg btn-dark d-flex" data-bs-toggle="modal" data-bs-target="#myModal">
        Search
      </button>
      <div className="modal fade" id="myModal" tabIndex={-1} aria-labelledby="exampleModalLabel" >
        <div className="modal-dialog modal-xl">
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Search</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <SearchMovie />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}