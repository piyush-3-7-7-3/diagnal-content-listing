/**
 * Utility function to determine if there are more items available
 * based on total content items and page size returned.
 *
 * @param {number} totalContentItems - The total number of content items.
 * @param {number} pageSizeRequested - The number of items returned on the current page.
 * @param {number} pageNo - The current page number.
 * @returns {boolean} - Returns true if there are more items, false otherwise.
 */
const hasMoreItems = (totalContentItems, pageSizeRequested, pageNo) => {
    return totalContentItems > pageSizeRequested * pageNo;
  };
  
  export default hasMoreItems;
  