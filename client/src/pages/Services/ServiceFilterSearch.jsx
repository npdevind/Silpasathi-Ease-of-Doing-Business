const ServiceFilterSearch = ({ searchService, setSearchService, msg }) => {
  return (
    <>
      <div className="row height d-flex justify-content-center align-items-center mb-2">
        <div className="col-md-12">
          <div className="form" style={{ position: "relative" }}>
            <input
              className="form-control form-input"
              type="text"
              id="example-search-input"
              value={searchService}
              placeholder="enter service name"
              onChange={(e) => {
                setSearchService(e.target.value);
              }}
            />
            {searchService && searchService.length < 3 && <span className="text-danger opacity-75 ">{msg}</span>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceFilterSearch;
