export const allowRoles =
  (...roles) => {

    return (
      req,
      res,
      next
    ) => {

      console.log(
        "USER ROLE:",
        req.user.role
      );

      console.log(
        "ALLOWED ROLES:",
        roles
      );

      if (

        !roles.includes(
          req.user.role
        )
      ) {

        console.log(
          "ACCESS DENIED"
        );

        return res.status(403)
          .json({

            success: false,

            message:
              "Access denied",
          });
      }

      console.log(
        "ACCESS GRANTED"
      );

      next();
    };
  };