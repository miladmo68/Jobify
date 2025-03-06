import Job from "../models/JobModel.js";
import { nanoid } from "nanoid";
import { NotFoundError } from "../errors/customErrors.js";
let jobs = [
  { id: nanoid(), company: "apple", position: "front-end developer" },
  { id: nanoid(), company: "google", position: "back-end developer" },
];

//GET ALL
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

// CREATE JOB
export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

// GET BY ID
export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) throw new NotFoundError(`no job with id : ${id}`);

  res.status(StatusCodes.OK).json({ job });
};

// UPDATE
export const updateJob = async (req, res) => {
  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedJob) throw new NotFoundError(`no job with id : ${id}`);
  res.status(StatusCodes.OK).json({ job: updatedJob });
};

// DELETE
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);
  if (!removedJob) throw new NotFoundError(`no job with id : ${id}`);
  res.status(StatusCodes.OK).json({ job: removedJob });
};
