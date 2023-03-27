const Sauces =  require('../models/sauces');



exports.createSauces = (req, res, next) => {
  const saucesObject = JSON.parse(req.body.sauce);
  delete saucesObject._id;
  const sauces = new Sauces({
    ...saucesObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    userlikes:[],
    userdisliked:[]
  });
  sauces.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => {res.status(400).json({ error });})      
};



exports.getSauces = (req, res, next) => {
  Sauces.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(404).json({ error }));
};


exports.getOneSauces = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then(sauces => {     
      console.log(sauces)
      res.status(200).json(sauces)}
      )
    .catch(error => res.status(404).json({ error }));
};


exports.updateSauces = (req, res, next) => {  
  const saucesObject = req.file ?
  {
    ...JSON.parse(req.body.sauces),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  Sauces.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};


exports.deleteSauces = (req, res, next) => {
  Sauces.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};