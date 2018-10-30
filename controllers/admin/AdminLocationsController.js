const Location = require("../../models/location");

module.exports.getLocations = async (req, res) => {
  let locations = await Location.find({})
    .exec();

  res.render("admin/locations", {
    locations: locations,
  });
}

module.exports.getSingleLocation = (req, res) => {
  Location.findById(req.params.id, (err, location) => {
    res.render("location", {
      location: location
    });
  });
}

module.exports.editLocation = (req, res) => {
  Location.findById(req.params.id, async (err, location) => {
    let locations = await Location.find({}).exec();

    res.render("admin/editLocation", {
      location: location
    });
  });
}

module.exports.createLocation = (req, res) => {
  var location = new Location();
  location.name = req.body.name; 
  location.save((err) => {
    if (err) res.send(err);
    console.log("Location created:", location);
    res.redirect("/admin/locations?alert=created");
  });
}
module.exports.deleteLocation = (req, res) => {
  Location.remove(
    {
      _id: req.params.id
    },
    (err, location) => {
      if (err) res.send(err);

      console.log("Location deleted");
      res.redirect("/admin/locations?alert=deleted");
    }
  );
}
module.exports.updateLocation = (req, res) => {
  Location.findById(req.params.id, (err, location) => {
    if (err) res.send(err);

    location.name = req.body.name; 

    location.save((err) => {
      if (err) res.send(err);

      console.log("Location updated:", location);
      res.redirect("/admin/locations/edit/" + location._id + "?alert=updated");
    });
  });
}
