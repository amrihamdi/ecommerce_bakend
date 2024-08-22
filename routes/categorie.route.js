const express = require('express');
const router = express.Router();
// Créer une instance de categorie.
const Categorie = require('../models/categorie');
const { verifyToken } = require('../middeleware/verify-token');
const { authorizeRoles } = require('../middeleware/authorizeRoles');
// afficher la liste des categories.
router.get('/',verifyToken, async (req, res, )=> {
    try {
    const getcategorie = await Categorie.find({}, null ,{sort: {_id: -1}});
    res.status(200).json(getcategorie);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    
});
// créer un nouvelle catégorie

router.post('/',verifyToken,authorizeRoles("admin","user"), async (req, res) => {
    const { nomcategorie, imagecategorie} = req.body;
    const postCategorie = new Categorie({nomcategorie:nomcategorie,
    imagecategorie:imagecategorie})
    try {
    await postCategorie.save();
    res.status(200).json(postCategorie);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
// chercher une catégorie
router.get('/:categorieId',async(req, res)=>{
    try {
    const findCategorie = await Categorie.findById(req.params.categorieId);
   
    res.status(200).json(findCategorie);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
    
 
});
// modifier une catégorie
router.put('/:categorieId', async (req, res)=> {
    try {
        const putcategorie = await Categorie.findByIdAndUpdate(req.params.categorieId,
        { $set: req.body },
        { new: true }
        );
        res.status(200).json(putcategorie);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
});
// Supprimer une catégorie
router.delete('/:categorieId', async (req, res)=> {
    try {
     await Categorie.findByIdAndDelete(req.params.categorieId);
    

    res.status(200).json({message: 'Catégorie supprimée'});
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
    
});
module.exports = router;
// créer une nouvelle catégorie