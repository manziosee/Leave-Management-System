const Joi = require('joi');
const { LeaveType } = require('../models/Leave');

const applyLeaveSchema = Joi.object({
  type: Joi.string()
    .valid(...Object.values(LeaveType))
    .required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().min(Joi.ref('startDate')).required(),
  reason: Joi.string().when('type', {
    is: Joi.valid('SICK', 'COMPASSIONATE'),
    then: Joi.required(),
    otherwise: Joi.optional()
  }),
  document: Joi.string().optional()
});

const processLeaveSchema = Joi.object({
  comments: Joi.string().optional()
});

module.exports = {
  applyLeaveSchema,
  processLeaveSchema
};