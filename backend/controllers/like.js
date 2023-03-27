const sauceModels = require('../models/sauces')

exports.likeUser = (req,res,next) => {
    
    var idSauce = req.params.id;
    var numLike = req.body.like;
    var userId = req.body.userId;

    console.log(req.body.like);


    sauceModels.findOne({_id: idSauce}).then( sauce => {

        switch(numLike){
            case -1:
                //ajouter  IdUser au tableau dislikes et incrémenter la variable dislike
                if(!sauce.userDisliked.includes(userId)){
                    sauce.userDisliked.push(userId);
                    sauce.dislikes++;
                }
                // je verifie dans l'ARRAY userLiked si l'userId de l'utilisateur est present si c'est le cas
                // je le supprime est de remet le compteur de like à 0
                if(sauce.userLiked.includes(userId)){
                    sauce.userLiked.splice(userId);
                    sauce.likes--;
                }
                
                break;
            case 0:
                 // dans ce cas je vérifie dans mes ARRAY userDislike & userLiked si il y a L'userId de l'utilisateur 
                 // si il est present dans mes ARRAY je supprime l'userId et je de remet le compteur de like à 0
                if (sauce.userDisliked.includes(userId)) {
                    sauce.userDisliked.splice(userId);
                    sauce.dislikes--;
                }
                if (sauce.userLiked.includes(userId)) {
                    sauce.userLiked.splice(userId);
                    sauce.likes--;
                }
                break;
            case 1:
                // ajouter IdUser au tableau like et incrémenter la variable dislike
                if(!sauce.userLiked.includes(userId)){
                    sauce.userLiked.push(userId);
                    sauce.likes++;
                }
                // je verifie dans l'ARRAY dislike si l'userId de l'utilisateur est present si c'est le cas
                // je le supprime est de remet le compteur de like à 0
               if(sauce.userDisliked.includes(userId)){
                   sauce.userDisliked.splice(userId);
                   sauce.dislikes--;
                }
                break;
            default:
                res.status(400).json({message : "mauvais ID"})
                break;
        }
        sauceModels.updateOne({ _id: idSauce }, 
            {  
            likes: sauce.likes,
            dislikes: sauce.dislikes,
            userLiked: sauce.userLiked,
            userDisliked: sauce.userDisliked 
        })
        .then(() => {
            res.status(200).json({ message: 'Objet modifié !' })
            
        })

    })
   
}