const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const borrowerController = require('../../controllers/borrower.controller');
const borrowerValidation = require('../../validations/borrower.validation');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(borrowerValidation.createBorrower), borrowerController.createBorrower)
  .get(auth('getUsers'), validate(borrowerValidation.getBorrowers), borrowerController.getBorrowers);

router
  .route('/:borrowerId')
  .get(auth('getUsers'), validate(borrowerValidation.getBorrower), borrowerController.getBorrower)
  .patch(auth('manageUsers'), validate(borrowerValidation.updateBorrower), borrowerController.updateBorrower)
  .delete(auth('manageUsers'), validate(borrowerValidation.deleteBorrower), borrowerController.deleteBorrower);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Borrowers
 *   description: Borrower management (create, read, update, delete)
 */

/**
 * @swagger
 * /borrowers:
 *   post:
 *     summary: Create a borrower
 *     tags: [Borrowers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lenderId
 *               - name
 *             properties:
 *               lenderId:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               kycStatus:
 *                 type: string
 *                 enum: [pending, verified, rejected]
 *     responses:
 *       201:
 *         description: Borrower created
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'

 *   get:
 *     summary: Get all borrowers
 *     tags: [Borrowers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of borrowers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Borrower'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /borrowers/{id}:
 *   get:
 *     summary: Get a borrower by ID
 *     tags: [Borrowers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Borrower ID
 *     responses:
 *       200:
 *         description: Borrower object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Borrower'
 *       404:
 *         $ref: '#/components/responses/NotFound'

 *   patch:
 *     summary: Update a borrower
 *     tags: [Borrowers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Borrower ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               kycStatus:
 *                 type: string
 *                 enum: [pending, verified, rejected]
 *     responses:
 *       200:
 *         description: Borrower updated
 *       404:
 *         $ref: '#/components/responses/NotFound'

 *   delete:
 *     summary: Delete a borrower
 *     tags: [Borrowers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Borrower ID
 *     responses:
 *       204:
 *         description: Deleted successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
