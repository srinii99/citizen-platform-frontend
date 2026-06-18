import { User } from "../user/user.model.js";
import { Application } from "../application/application.model.js";

export const getUsers = async (
  req,
  res
) => {
  try {

    const users =
      await User.find({
        role: "USER",
      })
      .select(
        "-otp -otp_expiry"
      )
      .sort({
        created_at: -1,
      });

    const result =
      await Promise.all(

        users.map(
          async (user) => {

            const applicationsCount =
              await Application.countDocuments({
                user_id: user._id,
              });

            return {
              _id: user._id,
              name: user.name,
              mobile: user.mobile,
              state: user.state,
              district: user.district,
              profile_completed:
                user.profile_completed,
              profile_completion_percentage:
                user.profile_completion_percentage,
              applicationsCount,
              created_at:
                user.created_at,
            };
          }
        )
      );

    res.status(200).json(
      result
    );

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to fetch users",
    });
  }
};

export const getUserById =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.params.id
        ).select(
          "-otp -otp_expiry"
        );

      if (!user) {

        return res
          .status(404)
          .json({
            message:
              "User not found",
          });
      }

      const applications =
        await Application.find({
          user_id: user._id,
        })
        .populate(
          "scheme_id",
          "title"
        );

      res.status(200).json({
        user,
        applications,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Failed to fetch user",
      });
    }
  };