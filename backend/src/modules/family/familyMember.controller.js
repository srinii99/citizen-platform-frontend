import {

  FamilyMember,

} from "./familyMember.model.js";


// -------------------------
// ADD FAMILY MEMBER
// -------------------------

export const addFamilyMember =
  async (req, res) => {

    try {

      const member =
        await FamilyMember.create({

          ...req.body,

          user_id:
            req.user.user_id,
        });


      return res.status(201)
        .json({

          success: true,

          data: member,
        });

    } catch (err) {

      return res.status(500)
        .json({

          success: false,

          error:
            err.message,
      });
    }
  };


// -------------------------
// GET FAMILY MEMBERS
// -------------------------

export const getFamilyMembers =
  async (req, res) => {

    try {

      const members =
        await FamilyMember.find({

          user_id:
            req.user.user_id,
        });


      return res.status(200)
        .json({

          success: true,

          data: members,
        });

    } catch (err) {

      return res.status(500)
        .json({

          success: false,

          error:
            err.message,
      });
    }
  };