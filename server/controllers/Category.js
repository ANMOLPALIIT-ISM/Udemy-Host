const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}
		const CategorysDetails = await Category.create({
			name: name,
			description: description,
		});
		console.log(CategorysDetails);
		return res.status(200).json({
			success: true,
			message: "Categorys Created Successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: true,
			message: error.message,
		});
	}
};

exports.showAllCategories = async (req, res) => {
	try {
		const allCategorys = await Category.find(
			{},
			{ name: true, description: true }
		).populate({
            path:"courses",
            populate:{
                path:"ratingAndReviews"
            }
        })
        .exec();
        ;
		res.status(200).json({
			success: true,
			data: allCategorys,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.categoryPageDetails = async (req, res) => {
    try {
           
            const {categoryId} = req.body;
            
            const selectedCategory = await Category.findById({_id:categoryId})
                                            .populate({
                                                path:"courses",
                                                populate:{
                                                    path:"ratingAndReviews"
                                                }
                                            }).exec();
            
            // console.log(selectedCategory);
            if(!selectedCategory) {
                return res.status(404).json({
                    success:false,
                    message:'Data Not Found',
                });
            }

            
            let differentCategories = await Category.find({
                                         _id: {$ne: categoryId},
                                         })
                                         .populate({
                                            path:"courses",
                                            populate:{
                                                path:"ratingAndReviews"
                                            }
                                         })
                                         .exec();

            differentCategories=differentCategories.flatMap((elem)=>elem.courses);
            const allCategories=await Category.find().populate({
                path:"courses",
                populate:{
                    path:"ratingAndReviews"
                }
            })
            .exec();
            const allCourses=allCategories.flatMap((category)=>category.courses);
            const mostSellingCourses=allCourses.sort((a,b)=>b.sold-a.sold).slice(0,10);
            return res.status(200).json({
                success:true,
                data: {
                    selectedCategory,
                    differentCategories,
                    mostSellingCourses
                },
            });

    }
    catch(error ) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}