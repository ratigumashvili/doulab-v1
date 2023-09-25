const AdditionalFilter = ({ handleInputChange, gender, type }) => {
  return (
    <>
      <form>
        <div className="flex gap-2">
          <div>
            <select name="" id="">
              <option value="or">OR</option>
              <option value="and">AND</option>
            </select>
          </div>
          <div>
            <label htmlFor="gender">gender</label>
            <select
              name="gender"
              id="gender"
              onChange={handleInputChange}
              value={gender}
            >
              <option value="man">man</option>
              <option value="female">female</option>
              <option value="un">undefined</option>
            </select>
          </div>
          <div>
            <label htmlFor="gender">type</label>
            <select
              name="gender"
              id="gender"
              onChange={handleInputChange}
              value={type}
            >
              <option value="">'</option>
              <option value="church">church</option>
              <option value="cemetery">cemetery</option>
            </select>
          </div>
        </div>
      </form>
    </>
  );
};

export default AdditionalFilter;
