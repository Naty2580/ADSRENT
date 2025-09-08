import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const inquirySchema = z.object({
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
  // requested_date could be added here if needed
});


const baseRegisterSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    password_confirmation: z.string(),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    address: z.object({
        region: z.string().min(1, 'Region is required'),
        city: z.string().min(1, 'City is required'),
        subcity: z.string().min(1, 'Sub-city is required'),
        specificArea: z.string().min(1, 'Specific area is required'),
    }),
    type: z.enum(['person', 'company'], { required_error: 'Please select a type' }),
    preference: z.enum(['tenant', 'lessor', 'buyer', 'seller'], { required_error: 'Please select a preference' }),
    agreeToTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must agree to the Terms & Conditions' }),
    }),
  });
  
  const personSchema = baseRegisterSchema.extend({
    type: z.literal('person'),
    gender: z.enum(['male', 'female'], { required_error: 'Please select a gender' }),
  });
  
  const companySchema = baseRegisterSchema.extend({
    type: z.literal('company'),
    businessLicense: z.string().min(1, 'Business license is required'),
    googleMapLink: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  });
  
  // This creates a "smart" schema that validates different fields based on the 'type' value.
  export const registerSchema = z.discriminatedUnion('type', [
    personSchema,
    companySchema,
  ]).refine(data => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"], // Set the error on the confirmation field
  });
  
  export const updateProfileSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    address: z.object({
      region: z.string().min(1, 'Region is required'),
      city: z.string().min(1, 'City is required'),
      subcity: z.string().min(1, 'Sub-city is required'),
    }),
    
  });

  export const addPropertySchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    listingType: z.enum(['rent', 'sale']),
    propertyType: z.enum(['apartment', 'house', 'office', 'land', 'villa', 'shop', 'condo', 'studio', 'building', 'warehouse', 'guesthouse']),
    price: z.number().min(1, 'Price must be a positive number'),
    currency: z.enum(['ETB', 'USD', 'GBP']),
    area: z.number().min(1, 'Area must be a positive number'),
    bedrooms: z.number().int().min(0).optional(),
    bathrooms: z.number().int().min(0).optional(),
    isFurnished: z.boolean(),
    // Location
    address: z.object({
        region: z.string().min(1, 'Region is required'),
        city: z.string().min(1, 'City is required'),
        subcity: z.string().min(1, 'Sub-city is required'),
        specificArea: z.string().min(1, 'Specific area is required'),
    }),
    amenities: z.array(z.string()).optional(),
    // Media will be handled separately by the uploader, not in this form schema.
  });

  // ... keep other schemas (login, register, etc.)

