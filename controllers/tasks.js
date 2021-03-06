const Task = require('../models/Task.js');
const asyncWrapper = require('../middleware/async.js');
const { createCustomError } = require('../errors/custom-error.js');

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(201).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task match id: ${taskID}`, 404));
  }
  res.status(201).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidator: true,
  });
  if (!task) {
    return next(createCustomError(`No task match id: ${taskID}`, 404));
  }
  res.status(201).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task match id: ${taskID}`, 404));
  }
  res.status(201).json({ task });
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
