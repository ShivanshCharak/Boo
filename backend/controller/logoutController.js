function logoutController(req, res) {
    try {
        res.clearCookie("token");
        return res.status(200).send({ message: "logged out successfully!" });
      } catch (error) {
        return res.status(500).send({ message: "Error logging out!", error });
      }
    
}

module.exports = logoutController;
