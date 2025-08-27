import ReactPaginate from "react-paginate";

export default function Pagination({currentPage,pageCount}) {
  function handlePageClick(e) {
currentPage(e.selected+1)
  }

  return (
  <ReactPaginate
  breakLabel="..."
  nextLabel=">>"
  onPageChange={(e)=>handlePageClick(e)}
  pageRangeDisplayed={1}
  pageCount={pageCount}
  previousLabel="<<"
  renderOnZeroPageCount={null}
  // forcePage={currentPage}
  containerClassName="flex justify-center list-none p-0 m-0 gap-1"
  pageLinkClassName="px-3 py-2 border border-gray-300 cursor-pointer no-underline rounded-md transition-colors"
  previousLinkClassName="px-3 py-2 border border-gray-300 cursor-pointer no-underline rounded-md hover:bg-gray-100 transition-colors"
  nextLinkClassName="px-3 py-2 border border-gray-300 cursor-pointer no-underline rounded-md hover:bg-gray-100 transition-colors"
  activeLinkClassName="bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
  disabledLinkClassName="opacity-50 cursor-not-allowed hover:bg-transparent"
  breakLinkClassName="px-3 py-2 cursor-default"
/>
  );
}
