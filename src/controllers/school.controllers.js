import db from '../config/db.js';
import { getDistance } from '../utils/getDistance.js';
import asyncHandler from '../middlewares/asynchandler.middleware.js';
import APIResponse from '../utils/apiResponse.js';
import APIError from '../utils/apiError.js';

// Add a new school to the database
const addSchool = asyncHandler(async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    throw new APIError('All fields are required.', 400);
  }

  const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
  const [result] = await db.promise().query(query, [name, address, latitude, longitude]);

  return res
    .status(201)
    .json(new APIResponse({ schoolId: result.insertId }, 'School added successfully', 201));
});

// Retrieve all schools and calculate distance from user's location
const listSchools = asyncHandler(async (req, res) => {
  const { latitude: userLat, longitude: userLng } = req.query;

  if (!userLat || !userLng) {
    throw new APIError('User latitude and longitude are required.', 400);
  }

  const query = 'SELECT * FROM schools';
  const [results] = await db.promise().query(query);

  const withDistance = results.map((school) => ({
    ...school,
    distance: getDistance(parseFloat(userLat), parseFloat(userLng), school.latitude, school.longitude),
  }));

  withDistance.sort((a, b) => a.distance - b.distance);

  return res
    .status(200)
    .json(new APIResponse(withDistance, 'Schools retrieved successfully', 200));
});

export { addSchool, listSchools };
