import { Schema, model, Document } from 'mongoose'
import { ACTIVITY_TYPES } from '../constants'

export interface EnquiryDocument extends Document {
  name: string
  email: string
  phone?: string
  destination: string
  activities: string[]
  startDate?: Date
  endDate?: Date
  groupSize: number
  budget?: string
  message?: string
  status: 'New' | 'Contacted' | 'Quoted' | 'Booked' | 'Closed'
  createdAt: Date
  updatedAt: Date
}

const enquirySchema = new Schema<EnquiryDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: String,
    destination: { type: String, required: true },
    activities: [{ type: String, enum: ACTIVITY_TYPES }],
    startDate: Date,
    endDate: Date,
    groupSize: { type: Number, required: true, min: 1 },
    budget: String,
    message: String,
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Quoted', 'Booked', 'Closed'],
      default: 'New',
    },
  },
  { timestamps: true }
)

enquirySchema.index({ status: 1 })
enquirySchema.index({ email: 1 })

export const EnquiryModel = model<EnquiryDocument>('Enquiry', enquirySchema)
