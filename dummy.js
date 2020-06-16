var Users = require('./app/models/users');
var db=require('./config/db');
var sha256 = require('js-sha256');
var Appraisals = require('./app/models/appraisals');
function getData(bemail){
    function getRandomElement(arr){
        return arr[Math.floor(Math.random()*arr.length)];
    }
    let name=['lewis','max','charles','norris','sebastian','sainz','ricciardo','alpha','beta','charlie','delta','eagle','tom','cruise','trump','donald','elon','bob'];
    let emailProvider=['gmail','yahoo','hotmail','outlook'];
    let domain=['com','in','us','rus','uk','ng','ai','nz','sx','mx'];
    const fname= getRandomElement(name);
    return {
        name: fname+' '+getRandomElement(name),
        email: fname+'@'+getRandomElement(emailProvider)+'.'+getRandomElement(domain),
        password: sha256(fname),
        role:'employee',
        boss_email: bemail
    }
}

function usersDummy(bossearr){
    
    for(let i=0;i<bossearr.length;++i)
    {
        Users.find({email:bossearr[i]}).then(res=>{
            console.log(res);
            if(res.length==0)
            {
                Users.create({email:bossearr[i],name:bossearr[i].split('@')[0],password:sha256(bossearr[i].split('@')[0]),role:'boss'}).then(res=>{
                    console.log("Added Boss Email",res);
                });
            }
        }).then(()=>{
            let arr=[];
            for(let j=0;j<10;++j)
            {
                arr.push(getData(bossearr[i]))
            }
            Users.insertMany(arr).then(res=>{
                console.log("Inserted",res.length);
            })
            .catch(err=>{
                console.error("error",err)
            })
        })
    };
}
let AppraisalsDummy = (bossearr) =>{
    console.log("Appraisal")
    Users.aggregate([{ $sample: { size: 5 }},{$match: { 'email': {'$nin': bossearr}}}],(err,res)=>{
        if(err)
        {
            console.error("ERR Aggregating",err);
        }
        else{
            let arx=[]
            for(let k=0;k<res.length;++k)
            {
                arx.push({rating:Math.floor(Math.random() * (4) + 1),author:res[k].boss_email,subject:`SubjectNo ${k}`,comments:`Comment ${k}`,reviewee:res[k].email});
            }
            console.log("Appraisals Generated ",arx.length)
            Appraisals.insertMany(arx,(err,resx)=>{
                if(err)
                {
                    console.log("Error in Inserting Appraisals",err);
                }
                console.log("Inserted Appraisal ",resx.length);
            });
        }
    });
}


let bossEmails=['nirmal@nirmal.com','admin@admin.com'];
Users.remove({},(err,ans)=>{
    if(err)
    {
        console.error("ERR Users Removal",err);
    }
    else{
        console.log("Removed Users");
    }
}).then(()=>{
    Appraisals.remove({},(err,ans)=>{
        if(err)
        {
            console.error("ERR Appraisals Removal",err);
        }
        else{
            console.log("Removed Users");
        }
    }).then(()=>{
        usersDummy(bossEmails)
        
    }).then(()=>{
        AppraisalsDummy(bossEmails);
    });
})