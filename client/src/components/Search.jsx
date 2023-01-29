import React from "react";

const Search = ({ handleSearch, input, setInput }) => {
  return (
    <>
      <form className="flex items-center gap-2 mb-2" onSubmit={handleSearch}>
        <label htmlFor="input"></label>
        <input
          type="text"
          name="input"
          value={input}
          id="input"
          required
          onChange={(e) => setInput(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
          focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
        />
        <button type="submit">搜尋</button>
      </form>
    </>
  );
};

export default Search;
