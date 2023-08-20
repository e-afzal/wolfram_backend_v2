// PACKAGES
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

// MODEL
import Property from "../models/propertyModel.js";

const getProperties = asyncHandler(async (req, res) => {
  // Fetch ALL Properties
  try {
    const properties = await Property.find();
    if (!properties || properties.length === 0) {
      return res
        .status(404)
        .json({ status: "fail", message: "Properties not found" });
    }
    res.status(200).json(properties);
  } catch (err) {
    res.status(404);
    throw Error("Unable to fetch properties");
  }
});

const getListings = asyncHandler(async (req, res) => {
  // Fetch properties with 'latestListing' property set to 'true'.
  // These properties are found on the 'homepage'.
  try {
    const getListings = await Property.find({ latestListing: true }).select(
      "_id area name price bedrooms bathrooms buildUp cardNo"
    );
    res.status(200).json(getListings);
  } catch (err) {
    res.status(404);
    throw new Error("Listing not found.");
  }
});

const getPropertyById = asyncHandler(async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .select(
        "_id image area name price category refNo completion bedrooms bathrooms buildUp parking description features agent"
      )
      .populate("agent", "name contact email image");

    res.status(200).json(property);
  } catch (err) {
    res.status(404);
    throw new Error("Property not found..");
  }
});

const search = asyncHandler(async (req, res) => {
  const {
    transaction,
    category,
    priceFrom,
    priceTo,
    minBeds,
    maxBeds,
    minArea,
    maxArea,
    search,
    sort,
    // minBath,
    // maxBath,
  } = req.body;

  try {
    // 'result1' contains ALL results that are 'name' specific
    const result1 = await Property.find({
      transaction: transaction || "sale",
      name: new RegExp(`.*${search}.*`, "i"),
      category: category === "all" ? ["apartment", "villa"] : category,
      price: { $gte: priceFrom || 0, $lte: priceTo || 50000000 },
      bedrooms: { $gte: minBeds || 1, $lte: maxBeds || 10 },
      // bathrooms: { $gte: minBath || 1, $lte: maxBath || 10 },
      buildUp: { $gte: minArea || 0, $lte: maxArea || 20000 },
    });

    // 'result2' contains ALL results that are 'area' specific
    const result2 = await Property.find({
      transaction: transaction || "sale",
      area: new RegExp(`.*${search}.*`, "i"),
      category: category === "all" ? ["apartment", "villa"] : category,
      price: { $gte: priceFrom || 0, $lte: priceTo || 50000000 },
      bedrooms: { $gte: minBeds || 1, $lte: maxBeds || 10 },
      // bathrooms: { $gte: minBath || 1, $lte: maxBath || 10 },
      buildUp: { $gte: minArea || 0, $lte: maxArea || 20000 },
    });

    // If there are no results for 'result1', show 'result2'.
    if (result1.length === 0) {
      res.json(result2);
    } else if (result2.length === 0) {
      // If there are no results for 'result2', show 'result1'.
      res.json(result1);
    } else if (result1.length > 0 && result2.length > 0) {
      // If there are results found in both, result1 and result2, REMOVE the DUPLICATES
      // using 'SET'
      const mergedResults = [...result1, ...result2];

      // REMOVE DUPLICATES using SET
      const set = new Set();
      const finalResult = mergedResults.filter((obj) => {
        const duplicate = set.has(obj.id);
        set.add(obj.id);
        return !duplicate;
      });
      res.json(finalResult);
    }
  } catch (err) {
    res.status(404);
    throw new Error("No results with the provided criteria..");
  }
});

export { getProperties, getListings, getPropertyById, search };
