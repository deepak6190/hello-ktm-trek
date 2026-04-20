import { Router } from 'express'
import { TripController } from '../controllers/trip.controller'
import { DestinationController } from '../controllers/destination.controller'
import { BlogController } from '../controllers/blog.controller'
import { EnquiryController } from '../controllers/enquiry.controller'
import { ReviewController } from '../controllers/review.controller'

const router = Router()
const tripCtrl = new TripController()
const destCtrl = new DestinationController()
const blogCtrl = new BlogController()
const enquiryCtrl = new EnquiryController()
const reviewCtrl = new ReviewController()

// Trips
router.get('/trips', (req, res) => tripCtrl.getTrips(req, res))
router.get('/trips/featured', (req, res) => tripCtrl.getFeaturedTrips(req, res))
router.get('/trips/popular', (req, res) => tripCtrl.getPopularTrips(req, res))
router.get('/trips/:slug', (req, res) => tripCtrl.getTripBySlug(req, res))

// Destinations
router.get('/destinations', (req, res) => destCtrl.getAll(req, res))
router.get('/destinations/:name', (req, res) => destCtrl.getByName(req, res))

// Blog
router.get('/blog', (req, res) => blogCtrl.getPosts(req, res))
router.get('/blog/categories', (req, res) => blogCtrl.getCategories(req, res))
router.get('/blog/recent', (req, res) => blogCtrl.getRecentPosts(req, res))
router.get('/blog/:slug', (req, res) => blogCtrl.getPostBySlug(req, res))

// Enquiries
router.post('/enquiries', (req, res) => enquiryCtrl.submit(req, res))

// Reviews
router.get('/reviews', (req, res) => reviewCtrl.getApprovedReviews(req, res))
router.get('/reviews/trip/:tripId', (req, res) => reviewCtrl.getReviewsForTrip(req, res))
router.post('/reviews', (req, res) => reviewCtrl.submitReview(req, res))

export default router
