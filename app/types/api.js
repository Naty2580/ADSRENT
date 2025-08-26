// This file doesn't export anything. It's for JSDoc type definitions
// used by VS Code for intellisense and type-checking in JS files.

/**
 * @typedef {'ETB' | 'USD' | 'GBP'} Currency
 *
 * @typedef {Object} Price
 * @property {string} amount - The display-formatted string, e.g., "85,000.00"
 * @property {number} raw - The unformatted number for calculations.
 * @property {Currency} currency
 */

/**
 * @typedef {Object} Location
 * @property {string} region
 * @property {string} city
 * @property {string} subcity
 * @property {string} specificArea
 * @property {number | null} latitude
 * @property {number | null} longitude
 */

/**
 * @typedef {Object} Media
 * @property {number} id
 * @property {string} url
 * @property {string | undefined} altText
 * @property {'image' | 'video'} type
 */

/**
 * @typedef {'sale' | 'rent'} ListingType
 *
 * @typedef {Object} Property
 * @property {number} id
 * @property {string} title
 * @property {ListingType} listingType
 * @property {Price} price
 * @property {Location} location
 * @property {number | null} bedrooms
 * @property {number | null} bathrooms
 * @property {number} area // in square meters
 * @property {Media[]} media // An array of images/videos
 */

/**
 * @typedef {Object} Lister
 * @property {number} id
 * @property {string} name
 * @property {string} avatarUrl
 * @property {string} memberSince
 */

/**
 * @typedef {'sale' | 'rent'} ListingType
 *
 * @typedef {Object} Property
 * @property {number} id
 * @property {string} title
 * @property {string} description // Added for detail page
 * @property {ListingType} listingType
 * @property {'active' | 'booked'} status // Simplified status for detail view
 * @property {Price} price
 * @property {Location} location
 * @property {number | null} bedrooms
 * @property {number | null} bathrooms
 * @property {number} area // in square meters
 * @property {boolean} isFurnished // Added
 * @property {string[]} amenities // Added
 * @property {Lister} lister // Added full lister object
 * @property {Media[]} media // Full array of media
 * @property {string} postedAt
 */

/**
 * @typedef {'person' | 'company'} AccountType
 *
 * @typedef {Object} Address
 * @property {string} region
 * @property {string} city
 * @property {string} subcity
 */

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {AccountType} type
 * @property {Address} address
 * @property {string} phoneNumber
 * @property {string[] | null} roles - From Spatie (e.g., ['seeker', 'lessor'])
 * @property {string | undefined} gender - (if type is 'person')
 * @property {string | undefined} businessLicense - (if type is 'company')
 * @property {string | undefined} googleMapLink - (if type is 'company')
 */

/**
 * @typedef {Object} AuthResponse
 * @property {string} token
 * @property {User} user
 */

export {};