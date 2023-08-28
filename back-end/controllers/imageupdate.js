app.post('/updatepic/:id',function (req, res, next){
  
    try {
        // code
        const userid = req.params.id
        var newData = req.body
        
  
        if (typeof req.file !== 'undefined') {
            newData.file = req.file.filename;
            fs.unlink('./uploads/' + newData.fileold, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Edit success')
                }
            })
        }
        connection.query("UPDATE users SET profilepic= ? WHERE id=? ",[req.file.profilepic,userid],(err,updatedata) =>  {
          if (err) return res.send(err);
          return res.json(updatedata);
        })
        // const updated = await Product
        //     .findOneAndUpdate({ _id: id }, newData, { new: true })
        //     .exec()
        res.send(updatedata);
  
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
  })