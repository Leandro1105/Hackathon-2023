import express from "express";
import Joi from "joi";
import { checkToken } from "../config/safeRoutes";

import Company from "../models/company";
import { connection } from "../server/database";

const router = express.Router();

const companySchema = Joi.object().keys({
  companyID: Joi.string().optional().uuid(),
  name: Joi.string().required(),
  type: Joi.string().required(),
});

router.get("/all", (_, res) => {
  const companyRepository = connection!.getRepository(Company);

  companyRepository.findAndCount().then((companies) => {
    res.json({ success: true, companies });
  }).catch(() => res.json({ success: false }));
});

router.post("/register", (req, res) => {
  // Joy Validation
  const result = companySchema.validate(req.body);
  if (result.error) {
    res.status(422).json({
      success: false,
      msg: `Validation err: ${result.error.details[0].message}`,
    });
    return;
  }

  const { name, type } = req.body;

  const companyRepository = connection!.getRepository(Company);

  companyRepository.findOne({ name }).then((company) => {
    if (company) {
      res.json({ success: false, msg: "Company already exists" });
    } else {
      const company = new Company();
      company.name = name;
      company.type = type;

      companyRepository.save(company).then((c) => {
        res.json({
          success: true,
          companyID: c.id,
          msg: "The company was successfully registered",
        });
      });
    }
  });
});

router.post('/edit', checkToken, (req, res) => {
  const result = companySchema.validate(req.body);
  if (result.error) {
    res.status(422).json({
      success: false,
      msg: `Validation err: ${result.error.details[0].message}`,
    });
    return;
  }

  const { companyID, name, type } = req.body;

  const companyRepository = connection!.getRepository(Company);

  companyRepository.find({ id: companyID }).then((company) => {
    if (company.length === 1) {
      const query = { id: company[0].id };
      const newvalues = { name, type };
      companyRepository.update(query, newvalues).then(
        () => {
          res.json({ success: true });
        },
      ).catch(() => {
        res.json({ success: false, msg: 'There was an error. Please contract the administrator' });
      });
    } else {
      res.json({ success: false, msg: 'Error updating company' });
    }
  });
});

export default router;