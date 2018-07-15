const Discord = require('discord.js');
const client = new Discord.Client();
const dot = new Discord.Client();
const Canvas = require("canvas-prebuilt");
const jimp = require("jimp");
const fs = require('file-system');
const moment = require('moment');
const prefix = "-";
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});





client.on("message", function(message) {
   if(message.content.startsWith(prefix + "rps")) {
    let messageArgs = message.content.split(" ").slice(1).join(" ");
    let messageRPS = message.content.split(" ").slice(2).join(" ");
    let arrayRPS = ['**# - Rock**','**# - Paper**','**# - Scissors**'];
    let result = `${arrayRPS[Math.floor(Math.random() * arrayRPS.length)]}`;
    var RpsEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setThumbnail(message.author.avatarURL)
    .addField("Rock","🇷",true)
    .addField("Paper","🇵",true)
    .addField("Scissors","🇸",true)
    message.channel.send(RpsEmbed).then(msg => {
        msg.react(' 🇷')
        msg.react("🇸")
        msg.react("🇵")
.then(() => msg.react('🇷'))
.then(() =>msg.react('🇸'))
.then(() => msg.react('🇵'))
let reaction1Filter = (reaction, user) => reaction.emoji.name === '🇷' && user.id === message.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === '🇸' && user.id === message.author.id;
let reaction3Filter = (reaction, user) => reaction.emoji.name === '🇵' && user.id === message.author.id;
let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
let reaction3 = msg.createReactionCollector(reaction3Filter, { time: 12000 });
reaction1.on("collect", r => {
        message.channel.send(result)
})
reaction2.on("collect", r => {
        message.channel.send(result)
})
reaction3.on("collect", r => {
        message.channel.send(result)
})

    })
}
});


let rebel;
client.on("ready", async  => {
    let guild = client.guilds.get("463153499790639114");
  let users = guild.members.map(member => member.user.id);
  let i;
  rebel=0;
for (i=0 ; i < users.length ; i++) {
 let   check = guild.members.get(users[i]);
if(!check.voiceChannelID){
        continue;
}else{
  rebel++;
}
}
guild.channels.find('id', '463349506658795530').setName(" Voice「"+rebel+"」");
  client.setInterval(() =>{
    let d = Date.now()
  }, 5000);
});
client.on('voiceStateUpdate', (oldMember, newMember) => {
    let guild = client.guilds.get("463153499790639114");
let newUserChannel = newMember.voiceChannel
let oldUserChannel = oldMember.voiceChannel
 if(oldUserChannel === undefined && newUserChannel !== undefined) {
   rebel++;
guild.channels.find('id', '463349506658795530').setName(" Voice「"+rebel+"」");
} else if(newUserChannel === undefined){
  rebel--;
guild.channels.find('id', '463349506658795530').setName(" Voice「"+rebel+"」");
}
});
client.on('message', Codes => {

  if(Codes.content === "-صوت") {
      Codes.channel.send(" Voice「"+rebel+"」");
}
});



client.on('message', function(message) {
    if(message.content.startsWith(prefix + "report")) {
        let messageArgs = message.content.split(" ").slice(1).join(" ");
        let messageReason = message.content.split(" ").slice(2).join(" ");
        if(!messageReason) return message.reply("**# Specify a reason!**");
    let mUser = message.mentions.users.first();
    if(!mUser) return message.channel.send("Couldn't find user.");
    let Rembed = new Discord.RichEmbed()
    .setTitle("`New Report!`")
    .setThumbnail(message.author.avatarURL)
    .addField("**# - Reported User:**",mUser,true)
    .addField("**# - Reported User ID:**",mUser.id,true)
    .addField("**# - Reason:**",messageReason,true)
    .addField("**# - Channel:**",message.channel,true)
    .addField("**# - Time:**",message.createdAt,true)
    .setFooter("لو ان الابلاغ فيه مزح راح يتعرض صاحب الابلاغ لقوبات")
message.channel.send(Rembed)
message.channel.send("__Are you sure you want to send this to the Server owner??__").then(msg => {
    msg.react("✅")
    msg.react("❌")
.then(() => msg.react('❌'))
.then(() =>msg.react('✅'))
let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
reaction1.on("collect", r => {
    message.guild.owner.send(Rembed)
    message.reply("**# - Done! 🎇**");
})
reaction2.on("collect", r => {
    message.reply("**# - Canceled!**");
})
})
}
});













const credits = JSON.parse(fs.readFileSync("./creditsCode.json", "utf8"));
const coolDown = new Set();

client.on('message',async message => {

if(message.author.bot) return;
if(!credits[message.author.id]) credits[message.author.id] = {
    credits: 50
};

let userData = credits[message.author.id];
let m = userData.credits;

fs.writeFile("./creditsCode.json", JSON.stringify(credits), (err) => {
    if (err) console.error(err);
  });
  credits[message.author.id] = {
      credits: m + 0.5,
  }

    if(message.content.startsWith(prefix + "credit" || prefix + "credits")) {
message.channel.send(`**${message.author.username}, your :credit_card: balance is \`\`${userData.credits}\`\`.**`);
}
});

client.on('message', async message => {
    let amount = 250;
    if(message.content.startsWith(prefix + "daily")) {
    if(message.author.bot) return;
    if(coolDown.has(message.author.id)) return message.channel.send(`**:stopwatch: | ${message.author.username}, your daily :yen: credits refreshes in \`\`1 Day\`\`.**`);

    let userData = credits[message.author.id];
    let m = userData.credits + amount;
    credits[message.author.id] = {
    credits: m
    };

    fs.writeFile("./creditsCode.json", JSON.stringify(userData.credits + amount), (err) => {
    if (err) console.error(err);
    });

    message.channel.send(`**:atm: | ${message.author.username}, you received your :yen: ${amount} credits!**`).then(() => {
        coolDown.add(message.author.id);
    });

    setTimeout(() => {
       coolDown.remove(message.author.id);
    },86400000);
    }
});







client.on('guildCreate', guild => {
  var embed = new Discord.RichEmbed()
  .setColor(0x5500ff)
  .setDescription(`**شكراً لك لإضافه البوت الى سيرفرك**`)
      guild.owner.send(embed)
});





client.on('message', msg => {

  if(msg.content.startsWith('-suggest')) {
    if(!msg.channel.guild) return msg.reply('** هاذا الامر فقط للسيرفرات**');
    if(!msg.guild.channels.find('name', 'suggestions')) return msg.reply('**الرجاء إضافة روم بإسم (suggestions)**');
    let args = msg.content.split(" ").slice(1);
    if(!args[1]) return msg.reply('الرجاء كتابة الاقتراح')
    //غيره على حسب اسم روم الاقتراحات او سوي مثل اسم الروم الموجود هنا
    if(msg.guild.channels.find('name', 'suggestions')) {
      //غيره هنا كمان اذا غيرت فوق
      msg.guild.channels.find('name', 'suggestions').send(`
      تم الاقتراح من قبل : ${msg.member}

      الاقتراح :
      ${args.join(" ").split(msg.mentions.members.first()).slice(' ')}
      `)
      .then(function (message) {
        message.react('✅')
        message.react('❌')
      })
      }
    }

});





const Sra7a = [
     'صراحه  |  صوتك حلوة؟',
     'صراحه  |  التقيت الناس مع وجوهين؟',
     'صراحه  |  شيء وكنت تحقق اللسان؟',
     'صراحه  |  أنا شخص ضعيف عندما؟',
     'صراحه  |  هل ترغب في إظهار حبك ومرفق لشخص أو رؤية هذا الضعف؟',
     'صراحه  |  يدل على أن الكذب مرات تكون ضرورية شي؟',
     'صراحه  |  أشعر بالوحدة على الرغم من أنني تحيط بك كثيرا؟',
     'صراحه  |  كيفية الكشف عن من يكمن عليك؟',
     'صراحه  |  إذا حاول شخص ما أن يكرهه أن يقترب منك ويهتم بك تعطيه فرصة؟',
     'صراحه  |  أشجع شيء حلو في حياتك؟',
     'صراحه  |  طريقة جيدة يقنع حتى لو كانت الفكرة خاطئة" توافق؟',
     'صراحه  |  كيف تتصرف مع من يسيئون فهمك ويأخذ على ذهنه ثم ينتظر أن يرفض؟',
     'صراحه  |  التغيير العادي عندما يكون الشخص الذي يحبه؟',
     'صراحه  |  المواقف الصعبة تضعف لك ولا ترفع؟',
     'صراحه  |  نظرة و يفسد الصداقة؟',
     'صراحه  |  ‏‏إذا أحد قالك كلام سيء بالغالب وش تكون ردة فعلك؟',
     'صراحه  |  شخص معك بالحلوه والمُره؟',
     'صراحه  |  ‏هل تحب إظهار حبك وتعلقك بالشخص أم ترى ذلك ضعف؟',
     'صراحه  |  تأخذ بكلام اللي ينصحك ولا تسوي اللي تبي؟',
     'صراحه  |  وش تتمنى الناس تعرف عليك؟',
     'صراحه  |  ابيع المجرة عشان؟',
     'صراحه  |  أحيانا احس ان الناس ، كمل؟',
     'صراحه  |  مع مين ودك تنام اليوم؟',
     'صراحه  |  صدفة العمر الحلوة هي اني؟',
     'صراحه  |  الكُره العظيم دايم يجي بعد حُب قوي " تتفق؟',
     'صراحه  |  صفة تحبها في نفسك؟',
     'صراحه  |  ‏الفقر فقر العقول ليس الجيوب " ، تتفق؟',
     'صراحه  |  تصلي صلواتك الخمس كلها؟',
     'صراحه  |  ‏تجامل أحد على راحتك؟',
     'صراحه  |  اشجع شيء سويتة بحياتك؟',
     'صراحه  |  وش ناوي تسوي اليوم؟',
     'صراحه  |  وش شعورك لما تشوف المطر؟',
     'صراحه  |  غيرتك هاديه ولا تسوي مشاكل؟',
     'صراحه  |  ما اكثر شي ندمن عليه؟',
     'صراحه  |  اي الدول تتمنى ان تزورها؟',
     'صراحه  |  متى اخر مره بكيت؟',
     'صراحه  |  تقيم حظك ؟ من عشره؟',
     'صراحه  |  هل تعتقد ان حظك سيئ؟',
     'صراحه  |  شـخــص تتمنــي الإنتقــام منـــه؟',
     'صراحه  |  كلمة تود سماعها كل يوم؟',
     'صراحه  |  **هل تُتقن عملك أم تشعر بالممل؟',
     'صراحه  |  هل قمت بانتحال أحد الشخصيات لتكذب على من حولك؟',
     'صراحه  |  متى آخر مرة قمت بعمل مُشكلة كبيرة وتسببت في خسائر؟',
     'صراحه  |  ما هو اسوأ خبر سمعته بحياتك؟',
     '‏صراحه | هل جرحت شخص تحبه من قبل ؟',
     'صراحه  |  ما هي العادة التي تُحب أن تبتعد عنها؟',
     '‏صراحه | هل تحب عائلتك ام تكرههم؟',
     '‏صراحه  |  من هو الشخص الذي يأتي في قلبك بعد الله – سبحانه وتعالى- ورسوله الكريم – صلى الله عليه وسلم؟',
     '‏صراحه  |  هل خجلت من نفسك من قبل؟',
     '‏صراحه  |  ما هو ا الحلم  الذي لم تستطيع ان تحققه؟',
     '‏صراحه  |  ما هو الشخص الذي تحلم به كل ليلة؟',
     '‏صراحه  |  هل تعرضت إلى موقف مُحرج جعلك تكره صاحبهُ؟',
	  '‏صراحه  |  هل قمت بالبكاء أمام من تُحب؟',
     '‏صراحه  |  ماذا تختار حبيبك أم صديقك؟',
     '‏صراحه  | هل حياتك سعيدة أم حزينة؟',
     'صراحه  |  ما هي أجمل سنة عشتها بحياتك؟',
     '‏صراحه  |  ما هو عمرك الحقيقي؟',
     '‏صراحه  |  ما اكثر شي ندمن عليه؟',
	 'صراحه  |  ما هي أمنياتك المُستقبلية؟‏',
]
   client.on('message', message => {
 if (message.content.startsWith('-صراحه')) {
     if(!message.channel.guild) return message.reply('** This command only for servers **');
  var client= new Discord.RichEmbed()
  .setTitle("لعبة صراحة ..")
  .setColor('RANDOM')
  .setDescription(`${Sra7a[Math.floor(Math.random() * Sra7a.length)]}`)
  .setImage("https://cdn.discordapp.com/attachments/371269161470525444/384103927060234242/125.png")
                  .setTimestamp()

   message.channel.sendEmbed(client);
   message.react("??")
 }
});


const Za7f = [
    "**صورة وجهك او رجلك او خشمك او يدك**.",
    "**اصدر اي صوت يطلبه منك الاعبين**.",
    "**سكر خشمك و قول كلمة من اختيار الاعبين الي معك**.",
    "**روح الى اي قروب عندك في الواتس اب و اكتب اي شيء يطلبه منك الاعبين  الحد الاقصى 3 رسائل**.",
    "**قول نكتة اذا و لازم احد الاعبين يضحك اذا محد ضحك يعطونك ميوت الى ان يجي دورك مرة ثانية**.",
    "**سمعنا صوتك و غن اي اغنية من اختيار الاعبين الي معك**.",
    "**ذي المرة لك لا تعيدها**.",
    "**ارمي جوالك على الارض بقوة و اذا انكسر صور الجوال و ارسله في الشات العام**.",
    "**صور اي شيء يطلبه منك الاعبين**.",
    "**اتصل على ابوك و قول له انك رحت مع بنت و احين هي حامل....**.",
    "**سكر خشمك و قول كلمة من اختيار الاعبين الي معك**.",
    "**سو مشهد تمثيلي عن مصرية بتولد**.",
    "**اعطي اي احد جنبك كف اذا مافيه احد جنبك اعطي نفسك و نبي نسمع صوت الكف**.",
    "**ذي المرة لك لا تعيدها**.",
    "**ارمي جوالك على الارض بقوة و اذا انكسر صور الجوال و ارسله في الشات العام**.",
    "**روح عند اي احد بالخاص و قول له انك تحبه و الخ**.",
    "**اكتب في الشات اي شيء يطلبه منك الاعبين في الخاص**.",
    "**قول نكتة اذا و لازم احد الاعبين يضحك اذا محد ضحك يعطونك ميوت الى ان يجي دورك مرة ثانية**.",
    "**سامحتك خلاص مافيه عقاب لك :slight_smile:**.",
    "**اتصل على احد من اخوياك  خوياتك , و اطلب منهم مبلغ على اساس انك صدمت بسيارتك**.",
    "**غير اسمك الى اسم من اختيار الاعبين الي معك**.",
    "**اتصل على امك و قول لها انك تحبها :heart:**.",
    "**لا يوجد سؤال لك سامحتك :slight_smile:**.",
    "**قل لواحد ماتعرفه عطني كف**.",
    "**منشن الجميع وقل انا اكرهكم**.",
    "**اتصل لاخوك و قول له انك سويت حادث و الخ....**.",
    "**روح المطبخ و اكسر صحن او كوب**.",
    "**اعطي اي احد جنبك كف اذا مافيه احد جنبك اعطي نفسك و نبي نسمع صوت الكف**.",
    "**قول لاي بنت موجود في الروم كلمة حلوه**.",
    "**تكلم باللغة الانجليزية الين يجي دورك مرة ثانية لازم تتكلم اذا ما تكلمت تنفذ عقاب ثاني**.",
    "**لا تتكلم ولا كلمة الين يجي دورك مرة ثانية و اذا تكلمت يجيك باند لمدة يوم كامل من السيرفر**.",
    "**قول قصيدة **.",
    "**تكلم باللهجة السودانية الين يجي دورك مرة ثانية**.",
    "**اتصل على احد من اخوياك  خوياتك , و اطلب منهم مبلغ على اساس انك صدمت بسيارتك**.",
    "**اول واحد تشوفه عطه كف**.",
    "**سو مشهد تمثيلي عن اي شيء يطلبه منك الاعبين**.",
    "**سامحتك خلاص مافيه عقاب لك :slight_smile:**.",
    "**اتصل على ابوك و قول له انك رحت مع بنت و احين هي حامل....**.",
    "**روح اكل ملح + ليمون اذا مافيه اكل اي شيء من اختيار الي معك**.",
    "**تاخذ عقابين**.",
    "**قول اسم امك افتخر بأسم امك**.",
    "**ارمي اي شيء قدامك على اي احد موجود او على نفسك**.",
    "**اذا انت ولد اكسر اغلى او احسن عطور عندك اذا انتي بنت اكسري الروج حقك او الميك اب حقك**.",
    "**اذهب الى واحد ماتعرفه وقل له انا كيوت وابي بوسه**.",
    "**تتصل على الوالده  و تقول لها خطفت شخص**.",
    "** تتصل على الوالده  و تقول لها تزوجت با سر**.",
    "**����تصل على الوالده  و تقول لها  احب وحده**.",
      "**تتصل على شرطي تقول له عندكم مطافي**.",
      "**خلاص سامحتك**.",
      "** تصيح في الشارع انا  مجنوون**.",
      "** تروح عند شخص تقول له احبك**.",

]


 client.on('message', message => {
   if (message.content.startsWith("-عقاب")) {
                if(!message.channel.guild) return message.reply('** This command only for servers**');
  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')
   .setThumbnail(message.author.avatarURL)
 .addField('R Bot' ,
  `${Za7f[Math.floor(Math.random() * Za7f.length)]}`)
  message.channel.sendEmbed(embed);
  console.log('[38ab] Send By: ' + message.author.username)
    }
});



client.on('message', ra3d => {
            var prefix = "r";
  if (ra3d.content ===  prefix + 'cc'){
              if (!ra3d.member.hasPermission('MANAGE_ROLES')) return ra3d.channel.sendMessage('`**⚠ | `[MANAGE_ROLES]` لا يوجد لديك صلاحية**');
              ra3d.channel.send("**✅ | يتم عمل الالوان**");
                  setInterval(function(){})
                    let count = 0;
                    let ecount = 0;
          for(let x = 1; x < 141; x++){
            ra3d.guild.createRole({name:x,
              color: 'RANDOM'})
              }
            }
       });



 const cuttweet = [
     'كت تويت ‏| تخيّل لو أنك سترسم شيء وحيد فيصبح حقيقة، ماذا سترسم؟',
     'كت تويت | أكثر شيء يُسكِت الطفل برأيك؟',
     'كت تويت | الحرية لـ ... ؟',
     'كت تويت | قناة الكرتون المفضلة في طفولتك؟',
     'كت تويت ‏| كلمة للصُداع؟',
     'كت تويت ‏| ما الشيء الذي يُفارقك؟',
     'كت تويت | موقف مميز فعلته مع شخص ولا يزال يذكره لك؟',
     'كت تويت ‏| أيهما ينتصر، الكبرياء أم الحب؟',
     'كت تويت | بعد ١٠ سنين ايش بتكون ؟',
     'كت تويت ‏| مِن أغرب وأجمل الأسماء التي مرت عليك؟',
     '‏كت تويت | عمرك شلت مصيبة عن شخص برغبتك ؟',
     'كت تويت | أكثر سؤال وجِّه إليك مؤخرًا؟',
     '‏كت تويت | ما هو الشيء الذي يجعلك تشعر بالخوف؟',
     '‏كت تويت | وش يفسد الصداقة؟',
     '‏كت تويت | شخص لاترفض له طلبا ؟',
     '‏كت تويت | كم مره خسرت شخص تحبه؟.',
     '‏كت تويت | كيف تتعامل مع الاشخاص السلبيين ؟',
     '‏كت تويت | كلمة تشعر بالخجل اذا قيلت لك؟',
     '‏كت تويت | جسمك اكبر من عٌمرك او العكسّ ؟!',
     '‏كت تويت |أقوى كذبة مشت عليك ؟',
     '‏كت تويت | تتأثر بدموع شخص يبكي قدامك قبل تعرف السبب ؟',
     'كت تويت | هل حدث وضحيت من أجل شخصٍ أحببت؟',
     '‏كت تويت | أكثر تطبيق تستخدمه مؤخرًا؟',
     '‏كت تويت | ‏اكثر شي يرضيك اذا زعلت بدون تفكير ؟',
     '‏كت تويت | وش محتاج عشان تكون مبسوط ؟',
     '‏كت تويت | مطلبك الوحيد الحين ؟',
     '‏كت تويت | هل حدث وشعرت بأنك ارتكبت أحد الذنوب أثناء الصيام؟',
]

 client.on('message', message => {
   if (message.content.startsWith("-كت تويت")) {
                if(!message.channel.guild) return message.reply('** This command only for servers**');
  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')
   .setThumbnail(message.author.avatarURL)
 .addField('لعبه كت تويت' ,
  `${cuttweet[Math.floor(Math.random() * cuttweet.length)]}`)
  message.channel.sendEmbed(embed);
  console.log('[id] Send By: ' + message.author.username)
    }
});

const secreT = [
  "**الحياة بكل ما فيها تقف دائمًا على حد الوسطية بين اتزان المعنى وضده من حب وكره وحق وباطل وعدل وظلم**.",
  "**كى تعيش عليك ان تتقن فن التجاهل باحتراف**.",
  "**لا تحزن على من اشعرك بان طيبتك غباء امام وقاحته**.",
  "**هناك من يحلم بالنجاح وهناك من يستيقظ باكرا لتحقيقه**.",
  "**ان تعالج ألمك بنفسك تلك هى القوة**.",
  "**الجميع يسمع ما تقول والاصدقاء ينصتون لما تقول وافضل الاصدقاء ينصتون لما اخفاه سكوتك**.",
  "**انتهى زمن الفروسية ، لم تنقرض الخيول بل انقرض الفرسان**.",
  "**ان تكون اخرسا عاقلا خير من ان تكون نطوقا جهولا**.",
  "**المناقشات العقيمة لا تنجب افكارا**.",
  "**نحن نكتب ما لا نستطيع ان نقول وما نريد ان يكون**.",
  "**نحن نكتب ما لا نستطيع ان نقول وما نريد ان يكون**.",
]


 client.on('message', message => {
   if (message.content.startsWith("-خواطر")) {
                if(!message.channel.guild) return message.reply('** This command only for servers**');
  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')

   .setThumbnail(message.author.avatarURL)
 .addField('لعبه خواطر' ,
  `${secreT[Math.floor(Math.random() * secreT.length)]}`)
  message.channel.sendEmbed(embed);
  console.log('[id] Send By: ' + message.author.username)
    }
});




const Love = [  "**احبك / عدد قطرات المـــطر والشجر وامواج البحر والنجوم الي تتزاحم مبهورة في جمال القمر**.",  "**ساعزفك وساجعلك لحنا تغني عليه جميع قصائد العشــق**.",  "**احبك موت... لاتسألني ما الدليل ارأيت رصاصه تسأل القتيل؟**.",  "**ربما يبيع الانسان شيئا قد شراه لاكن لا يبيع قلبا قد هواه**.",  "**و ما عجبي موت المحبين في الهوى ........... و لكن بقاء العاشقين عجيب**.",   "**حلفت / لاحشـــد جيوش الحب واحتلك مسكين ربي بلاك بعـــاشق ارهـــابي**.",   "**العيــن تعشق صورتك ... والقلب يجري فيه دمك وكل مااسمع صوتك ...شفايفي تقول احبك**.",   "**ياحظ المكان فيك..ياحظ من هم حواليك ...ياحظ الناس تشوفك ... وانا مشتاق اليك**.",   "**لو كنت دمعة داخل عيوني بغمض عليك وصدقي ما راح افتح...ولو كان الثمن عيوني**.",   "**سهل اموت عشانك لكن الصعب اعيش بدونك سهل احبك لكن صعب انساك**.",   "**أخشى ان انظر لعيناك وأنا فى شوق ولهيب لرؤياك**.",   "**أتمنى ان اكون دمعة تولد بعينيك واعيش على خديك واموت عند شفتيك**.",   "**أحياناً أرى الحياة لا تساوى إبتسامة لكن دائماً إبتسامتك هى كيانى**.",   "**من السهل أن ينسى الانسان نفسه .. لكن من الصعب ان ينسى نفساً سكنت نفسه !**.",   "**نفسى أكون نجمة سماك .. همسة شفاك .. شمعة مساك .. بس تبقى معايا وانا معاك**.",   "**أهنئ قلبى بحبك وصبر عينى فى بعدك وأقول إنك نور عينى يجعل روحى فدى قلبك**.", ]


 client.on('message', message => {
   if (message.content.startsWith("-حب")) {
                if(!message.channel.guild) return message.reply('** This command only for servers**');
  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')
   .setThumbnail(message.author.avatarURL)
 .addField('لعبة حب' ,
  `${Love[Math.floor(Math.random() * Love.length)]}`)
  message.channel.sendEmbed(embed);
  console.log('[id] Send By: ' + message.author.username)
    }
});



console.log('mariam ra7t tmot al nas');
client.on('ready', () => {
  console.log(`im redey`);
});
const zead = [
   '*** انا اسمي مريم ***',
   '*** مرحباَ ماهو اسمك ؟ ***',
   `*** اهلا بك ! انا تائهه في هذا المكان  ***`,
   '*** هل تود مساعدتي ؟ ***',
   '*** لماذا هل انت قاسي القلب ؟ ***',
   '*** انني اشفق عليك عليك يجب ان تطهر روحك وتحب الخير للجميع ***',
   '*** ابتعد عني قليل انني متعبة ***',
   '*** هل انت نادم على ماقلت ؟ ***',
   '*** ابتعد عني قليل انني متعبة ***',
   '*** هل انت نادم على ماقلت ؟ ***',
   '*** هل تود مساعدتي ؟ ***',
   '*** واو اشكرك انك شخصاَ رائع ! ***',
   '*** ابحث معي عن منزلي لقد كان قريباَ من هنا ***',
   '*** ولاكن عندما حل الليل لم اعد ارى اي شيء ***',
   '*** مذا تظن اين يوجد ؟ يمين او يسار ***',
   '*** هيا اذاَ ***',
   '*** اود ان اسئلك سؤال ونحن في الطريق ***',
   '*** هل تراني فتاة لطيفة ام مخيفة ***',
   '*** اشكرك !  ***',
   '*** لقد وصلنا الى المنزل شكراَ جزيلَ انتطرني ثواني وسوف اعود ***',
   '*** هل انت جاهز ؟ ***',
   '*** لقد اخبرت والدي عنك وهم متحمسين لرؤيتك ***',
   '*** هل تود ان تراهم الان ***',
'*** انا لست الحوت الازرق كما يدعون ***',
   '*** انا لست كاذبة صدقني***',
   '*** لماذا ارى في عينيك الخوف ؟ ***',
   '*** انا مجرد فتاة لطيفة تحب اللعب مع الجميع ***',
   '*** اعرف كل شيء يحدث اسمع ذالك بالراديو ***',
   '*** سمعت ان البشر يقتلون من اجل المال فقط ***',
   '*** لماذا لم تدخل الغرفة ؟ ***',
   '*** ههههههههههههههههههه انت الان مسجون في هذه الغرفة ***',
   '*** لن تخرج حتى اعود لك بعد قليل ***',
   '*** المفتاح معك ! اكتب .مريم  ***',
   '*** مفتاح احمر , هل حصلت عليه ؟ ***',
   '*** ان لم تحصل عليه , اكتب .مريم مرة اخرى ***',
   '*** مفتاح اسود . هل حصلت عليه ؟ ***',
   '*** اين تريد ان تختبئ بسرعة قبل ان تعود ***',
   '*** لقد عادت من جديد الى المنزل ***',
   '*** لا تصدر اي صوت ! ***',
   '*** مريم : لقد عدت ***',
   '*** مريم : يا ايها المخادع اين انت ***',
   '*** مريم : اعلم انك هنا في المنزل ***',
   '*** مريم : ماذا تريد ان تسمع ***',
   '*** مريم : اضغط على الرابط اهداء مني لك | https://www.youtube.com/watch?v=hvSiuQccmtg ***',
   '*** احد ما خرج من المنزل ***',
   '*** انتظر الجزء الثاني عندما يوصل البوت 100 سيرفر , ساعدني في نشر البوت وادخل هذا السيرفر  ***'
]
 client.on('message', message => {
 if (message.content.startsWith('-مريم')) {
  var mariam= new Discord.RichEmbed()
  .setTitle("لعبة مريم ..")
  .setColor('RANDOM')
  .setDescription(`${zead[Math.floor(Math.random() * zead.length)]}`)
  .setImage("https://www.npa-ar.com/wp-content/uploads/2017/08/%D9%84%D8%B9%D8%A8%D8%A9-%D9%85%D8%B1%D9%8A%D9%85-300x200.jpg")
   message.channel.sendEmbed(mariam);
   message.react("??")
  }
});


client.on('message', function(message) {
    if(message.content.startsWith(prefix + 'قرعه')) {
        let args = message.content.split(" ").slice(1);
        if (!args[0]) {
            message.channel.send('حط رقم معين يتم السحب منه');
            return;
            }
    message.channel.send(Math.floor(Math.random() * args.join(' ')));
            if (!args[0]) {
          message.edit('1')
          return;
        }
    }
});


const kingmas = [
   '*** منشن الجميع وقل انا اكرهكم. ***',
'*** اتصل على امك و قول لها انك تحبها :heart:. ***',
   '***     تصل على الوالده  و تقول لها  احب وحده.***',
   '*** تتصل على شرطي تقول له عندكم مطافي.***',
   '*** صور اي شيء يطلبه منك الاعبين.***',
   '*** اكتب في الشات اي شيء يطلبه منك الاعبين في الخاص. ***',
   '*** اتصل على احد من اخوياك  خوياتك , و اطلب منهم مبلغ على اساس انك صدمت بسيارتك.***',
   '*** اعطي اي احد جنبك كف اذا مافيه احد جنبك اعطي نفسك و نبي نسمع صوت الكف.***',
   '***  تروح عند شخص تقول له احبك. ***',
   '***روح عند اي احد بالخاص و قول له انك تحبه و الخ.***',
   '*** اذهب الى واحد ماتعرفه وقل له انا كيوت وابي بوسه. ***',
   '*** روح الى اي قروب عندك في الواتس اب و اكتب اي شيء يطلبه منك الاعبين  الحد الاقصى 3 رسائل. ***',
   '*** اذا انت ولد اكسر اغلى او احسن عطور عندك اذا انتي بنت اكسري الروج حقك او الميك اب حقك. ***',
   '*** ذي المرة لك لا تعيدها.***',
   '*** ارمي جوالك على الارض بقوة و اذا انكسر صور الجوال و ارسله في الشات العام.***',
   '*** اتصل على ابوك و قول له انك رحت مع بنت و احين هي حامل..... ***',
   '*** تكلم باللهجة السودانية الين يجي دورك مرة ثانية.***',
   '***سو مشهد تمثيلي عن مصرية بتولد.***',
   '*** قول نكتة اذا و لازم احد الاعبين يضحك اذا محد ضحك يعطونك ميوت الى ان يجي دورك مرة ثانية. ***',
   '*** قول نكتة اذا و لازم احد الاعبين يضحك اذا محد ضحك يعطونك ميوت الى ان يجي دورك مرة ثانية.***',
   '*** سامحتك خلاص مافيه عقاب لك :slight_smile:. ***',
   '*** اذهب الى واحد ماتعرفه وقل له انا كيوت وابي بوسه.***',
   '*** تتصل على الوالده  و تقول لها خطفت شخص. ***',
   '*** روح اكل ملح + ليمون اذا مافيه اكل اي شيء من اختيار الي معك.  ***'
]
 client.on('message', message => {

 if (message.content.startsWith(prefix + 'حكم')) {
  var mariam= new Discord.RichEmbed()
  .setTitle("لعبة حكم ..")
  .setColor('RANDOM')
  .setDescription(`${kingmas[Math.floor(Math.random() * kingmas.length)]}`)
   message.channel.sendEmbed(mariam);
   message.react(":thinking:")
  }
});


client.on('ready', () => {
   console.log(`----------------`);
      console.log(`BOT STARTED`);
        console.log(`---------------`);
      console.log(`ON ${client.guilds.size} Servers `);
    console.log(`---------------`);
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setGame(`-help|-invite`,"http://twitch.tv/vAmmvr_");
   client.user.setStatus("idle");
});




  client.on('message',function(message) {
  if (message.author.bot) return;


                  if(!message.channel.guild) return;

                    if (message.content === prefix + "members") {
 const embed = new Discord.RichEmbed()

    .setDescription(`**Members info ✨
💚 online:   ${message.guild.members.filter(m=>m.presence.status == 'online').size}
❤  dnd:       ${message.guild.members.filter(m=>m.presence.status == 'dnd').size}
💛  idle:     ${message.guild.members.filter(m=>m.presence.status == 'idle').size}
💠   membersCount:  ${message.guild.memberCount - message.guild.members.filter(m=>m.user.bot).size}
💡 bots: ${message.guild.members.filter(m=>m.user.bot).size} **`)
         message.channel.send({embed});

    }
      });






client.on("guildCreate", guildadd => {
client.channels.get("463154023864860682").send(' ***  BOT  *** :white_check_mark:  **Join To**   ***[ ' + `${guildadd.name}` + ' ]***   ,   **  Owner  **  ' + ' ***[ ' + '<@' + `${guildadd.owner.user.id}` + '>' + ' ]***  **|**  ***[ ' + '<' + `${guildadd.owner.user.username}` + '>' + ' ]***')
});

client.on("guildDelete", guildadd => {
client.channels.get("463154023864860682").send(' ***  BOT  ***  :x: **Leave From**   ***[ ' + `${guildadd.name}` + ' ]***   ,   **  Owner  **  ' + ' ***[ ' + '<@' + `${guildadd.owner.user.id}` + '>' + ' ]***  **|**  ***[ ' + '<' + `${guildadd.owner.user.username}` + '>' + ' ]***')
});


client.on('message', message => {
    if (message.content.startsWith("رابط")) {
        message.channel.createInvite({
        thing: true,
        maxUses: 1,
        maxAge: 3600,
    }).then(invite =>
      message.author.sendMessage(invite.url)
    )
    const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
          .setDescription(" تم أرسال الرابط برسالة خاصة ")
           .setAuthor(client.user.username, client.user.avatarURL)
                 .setAuthor(client.user.username, client.user.avatarURL)
                .setFooter('طلب بواسطة: ' + message.author.tag)

      message.channel.sendEmbed(embed).then(message => {message.delete(10000)})
              const Embed11 = new Discord.RichEmbed()
        .setColor("RANDOM")

    .setDescription(" مدة الرابط : ساعه  عدد استخدامات الرابط : 1 ")
      message.author.sendEmbed(Embed11)
    }
});




















    client.on('message', message => {
  if (message.author.codes) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "ban") {
               if(!message.channel.guild) return message.reply('** This command only for servers**');

  if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("**انت لا تملك الصلاحيات المطلوبه**");
  if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
  let user = message.mentions.users.first();

  if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
  if (!message.guild.member(user)
  .bannable) return message.reply("**يجب ان تكون رتبة البوت اعلي من رتبه الشخص المراد تبنيدة**");


  message.guild.member(user).ban(7, user);

message.channel.send(`**:white_check_mark: ${user.tag} banned from the server ! :airplane: **  `)

}
});






client.on('message',function(message) {
    let toKick = message.mentions.users.first();
    let toReason = message.content.split(" ").slice(2).join(" ");
    let toEmbed = new Discord.RichEmbed()
   if(message.content.startsWith(prefix + 'kick')) {
       if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply('**# - You dont have enough permissions!**');
       if(toKick.bannable) return message.reply("**# - I cannot kick someone with a higher role than me!**");
       if(!toReason) return message.reply("**# - Supply a reason!**")
       if(toKick.id === message.author.id) return message.reply("**# You cannot kick yourself!**")
       if(!message.guild.member(toKick).bannable) return message.reply("**# - I cannot ban this person!**")
       let toEmbed;
       toEmbed = new Discord.RichEmbed()
       .setTitle("You have been kicked from a server!")
       .setThumbnail(toKick.avatarURL)
       .addField("**# - Server:**",message.guild.name,true)
       .addField("**# - Reason:**",toReason,true)
       .addField("**# - Kicked By:**",message.author,true)
       if(message.member.hasPermission("KICK_MEMBERS")) return (
           toKick.sendMessage({embed: toEmbed}).then(() => message.guild.member(toKick).kick()).then(() => message.channel.send(`**# Done! I kicked: ${toKick}**`))
       )
       }
});





client.on('message', message => {
   if(!message.channel.guild) return;
if(message.content.startsWith(prefix + 'clear')) {
if(!message.channel.guild) return message.channel.send('**This Command is Just For Servers**').then(m => m.delete(5000));
if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**You Do not have permission** `ADMINISTRATOR`' );
let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
let request = `Requested By ${message.author.username}`;
message.channel.send(`**Are You sure you want to clear the chat?**`).then(msg => {
msg.react('✅')
.then(() => msg.react('❌'))
.then(() =>msg.react('✅'))

let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
reaction1.on("collect", r => {
message.channel.send(`Chat will delete`).then(m => m.delete(5000));
var msg;
        msg = parseInt();

      message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
      message.channel.sendMessage("", {embed: {
        title: "`` Chat Deleted ``",
        color: 0x06DF00,
        footer: {

        }
      }}).then(msg => {msg.delete(3000)});

})
reaction2.on("collect", r => {
message.channel.send(`**Chat deletion cancelled**`).then(m => m.delete(5000));
msg.delete();
})
})
}
});




client.on('message', message => {
    let args = message.content.split(' ').slice(1);
    if(message.content.startsWith(prefix + 'role')) {
        let member = message.mentions.users.first();
        let role = args.join(' ').replace(member, '').replace(args[0], '').replace(' ', '');
        console.log(role);
        if(member) {
              if(role.startsWith('-')) {
                let roleRe = args.join(' ').replace(member, '').replace(args[0], '').replace('-', '').replace(' ', '');
                console.log(roleRe);
                let role1 = message.guild.roles.find('name', roleRe);
                console.log(`hi`);
                if(!role1) return message.reply(`الرتبة غير موجودة بالسيرفر تأكد من الاسم`);
                message.guild.member(member).removeRole(role1.id);
            } else if(!role.startsWith('-')) {
                let roleRe = args.join(' ').replace(member, '').replace(args[0], '').replace('-', '').replace(' ', '');
                let role1 = message.guild.roles.find('name', roleRe);
                if(!role1) return message.reply(`الرتبة غير موجودة بالسيرفر تأكد من الاسم`);
                message.guild.member(member).addRole(role1);
            } else {
                message.reply(`يجب عليك كتابة اسم الرتبة`);
            }
        }
 else if(args[0] == 'all') {
    if(role) {
    let role1 = message.guild.roles.find('name', role);
    if(!role1) return message.reply(`الرتبة غير موجودة بالسيرفر تأكد من الاسم`);
    message.channel.send(`الرجاء الانتظار حتى يتم الانتهاء من الامر`).then(msg => {
        message.guild.members.forEach(m => {
            message.guild.member(m).addRole(role1);
        });
        msg.edit(`تم الانتهاء من الامر ${message.guild.members.size}`);
    });
}
} else if(args[0] == 'humans') {
    if(role) {
        let role1 = message.guild.roles.find('name', role);
        if(!role1) return message.reply(`الرتبة غير موجودة بالسيرفر تأكد من الاسم`);
        message.channel.send(`الرجاء الانتظار حتى يتم الانتهاء من الامر`).then(msg => {
            message.guild.members.filter(m =>m.user.bot == false).forEach(m => {
                message.guild.member(m).addRole(role1);
            });
            msg.edit(`تم الانتهاء من الامر ${message.guild.members.size}`);
        });
    }
} else if(args[0] == 'bots') {
    if(role) {
        let role1 = message.guild.roles.find('name', role);
        if(!role1) return message.reply(`الرتبة غير موجودة بالسيرفر تأكد من الاسم`);
        message.channel.send(`الرجاء الانتظار حتى يتم الانتهاء من الامر`).then(msg => {
            message.guild.members.filter(m =>m.user.bot == true).forEach(m => {
                message.guild.member(m).addRole(role1);
            });
msg.edit(`تم الانتهاء من الامر ${message.guild.members.size}`);
});
}
}
}
});





client.on('message', message => {
   if(!message.channel.guild) return;
if(message.content.startsWith(prefix + 'bc')) {
if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**للأسف لا تمتلك صلاحية** `ADMINISTRATOR`' );
let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
let BcList = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.setAuthor(`محتوى الرساله ${args}`)
.setDescription(`برودكاست بـ امبد 📝\nبرودكاست بدون امبد✏ \nلديك دقيقه للأختيار قبل الغاء البرودكاست\nيمكنك اضافة اسم السيرفر في البرودكاست عن طريق كتابة <server>\nيمكنك اضافة اسم المرسل في البرودكاست عن طريق كتاية <by>\nيمكنك منشنة العضو في الرساله عن طريق كتابة <user>`)
if (!args) return message.reply('**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**');message.channel.send(BcList).then(msg => {
msg.react('📝')
.then(() => msg.react('✏'))
.then(() =>msg.react('📝'))

let EmbedBcFilter = (reaction, user) => reaction.emoji.name === '📝' && user.id === message.author.id;
let NormalBcFilter = (reaction, user) => reaction.emoji.name === '✏' && user.id === message.author.id;

let EmbedBc = msg.createReactionCollector(EmbedBcFilter, { time: 60000 });
let NormalBc = msg.createReactionCollector(NormalBcFilter, { time: 60000 });


EmbedBc.on("collect", r => {

message.channel.send(`:ballot_box_with_check: تم ارسال الرساله بنجاح`).then(m => m.delete(5000));
message.guild.members.forEach(m => {
let EmbedRep = args.replace('<server>' ,message.guild.name).replace('<user>', m).replace('<by>', `${message.author.username}#${message.author.discriminator}`)
var bc = new
Discord.RichEmbed()
.setColor('RANDOM')
.setDescription(EmbedRep)
.setThumbnail(message.author.avatarURL)
m.send({ embed: bc })
msg.delete();
})
})
NormalBc.on("collect", r => {
  message.channel.send(`:ballot_box_with_check: تم ارسال الرساله بنجاح`).then(m => m.delete(5000));
message.guild.members.forEach(m => {
let NormalRep = args.replace('<server>' ,message.guild.name).replace('<user>', m).replace('<by>', `${message.author.username}#${message.author.discriminator}`)
m.send(NormalRep);
msg.delete();
})
})
})
}
});





client.on('message', message => {
      if(message.content.startsWith(prefix + 'mutevoice')) {
        if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.sendMessage("**ليس لديك صلاحية لاعطاء ميوت صوتي**:x: ").then(m => m.delete(5000));
        if(!message.guild.member(client.user).hasPermission("MUTE_MEMBERS")) return message.reply("**I Don't Have `MUTE_MEMBERS` Permission**").then(msg => msg.delete(6000))

      if(message.mentions.users.size === 0) {
        return message.reply("منشن الشغص لتبي تعطيه ميوت.");
      }
      let muteMember = message.guild.member(message.mentions.users.first());
      if(!muteMember) {
        return message.reply("Try again.");
      }
      muteMember.setMute(true);
      if(muteMember) {
        message.channel.sendMessage("User muted successfully.");
      }
    }
  });

  client.on('message', message => {
    if(message.content.startsWith(prefix + 'unmutevoice')) {
      if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.sendMessage("**ليس لديك صلاحية لاعطاء ميوت صوتي**:x: ").then(m => m.delete(5000));
      if(!message.guild.member(client.user).hasPermission("MUTE_MEMBERS")) return message.reply("**I Don't Have `MUTE_MEMBERS` Permission**").then(msg => msg.delete(6000))

    if(message.mentions.users.size === 0) {
        return message.reply("منشن الشغص لتبي تفك عنه ميوت.");
    }
    let muteMember = message.guild.member(message.mentions.users.first());
    if(!muteMember) {
      return message.reply("Try again.");
    }
    muteMember.setMute(false);
    if(muteMember) {
      message.channel.sendMessage("User muted successfully.");
    }
  }
});


client.on('message', message => {
    if (message.content.startsWith("رابط")) {

  message.channel.createInvite({
        thing: true,
        maxUses: 100,
        maxAge: 86400
    }).then(invite =>
      message.author.sendMessage(invite.url)
    )
    const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(" ✅    تم ارسال الرابط على الخاص  ")
      message.channel.sendEmbed(embed).then(message => {message.delete(10000)})
              const Embed11 = new Discord.RichEmbed()
        .setColor("RANDOM")
                .setAuthor(message.guild.name, message.guild.iconURL)
        .setDescription(`
**

-${message.guild.name}  Link
**`)
      message.author.sendEmbed(Embed11)
    }
});






client.on('message', message => {
  if (message.content.startsWith(prefix + "id")) {
  if(!message.channel.guild) return message.reply(`هذا الأمر فقط ل السيرفرات :x:`);
   message.guild.fetchInvites().then(invs => {
      let member = client.guilds.get(message.guild.id).members.get(message.author.id);
      let personalInvites = invs.filter(i => i.inviter.id === message.author.id);
      let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
      var moment = require('moment');
      var args = message.content.split(" ").slice(1);
let user = message.mentions.users.first();
var men = message.mentions.users.first();
 var heg;
 if(men) {
     heg = men
 } else {
     heg = message.author
 }
var mentionned = message.mentions.members.first();
  var h;
 if(mentionned) {
     h = mentionned
 } else {
     h = message.member
 }
moment.locale('ar-TN');
      var id = new  Discord.RichEmbed()
    .setColor("#0a0909")
    .setAuthor(message.author.username, message.author.avatarURL)
.addField(': دخولك لديسكورد قبل', `${moment(heg.createdTimestamp).format('YYYY/M/D HH:mm:ss')} **\n** \`${moment(heg.createdTimestamp).fromNow()}\`` ,true)
.addField(': انضمامك لسيرفر قبل', `${moment(h.joinedAt).format('YYYY/M/D HH:mm:ss')} \n \`${moment(h.joinedAt).fromNow()}\``, true)
.addField(': عدد الدعوات', inviteCount,false)
.setFooter("-")
    message.channel.sendEmbed(id);
})
}
     });



client.on('message', message => {
   if(message.content.startsWith(prefix + "inv")) {
    message.guild.fetchInvites().then(invs => {
      let user = message.mentions.users.first() || message.author
      let personalInvites = invs.filter(i => i.inviter.id === user.id);
      let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
message.channel.send(`${user} has ${inviteCount} invites.`);
});
  }
});





client.on('message', async message =>{
const ms = require("ms");
if (message.author.omar) return;
if (!message.content.startsWith(prefix)) return;
if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply("**I Don't Have `MANAGE_ROLES` Permission**").then(msg => msg.delete(6000))
var command = message.content.split(" ")[0];
command = command.slice(prefix.length);
var args = message.content.split(" ").slice(1);
    if(command == "mute") {
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("**يجب عليك المنشن اولاّ**:x: ") .then(m => m.delete(5000));
	if(tomute.hasPermission("MANAGE_MESSAGES"))return      message.channel.send('**للأسف لا أمتلك صلاحية** `MANAGE_MASSAGEES`');
    let muterole = message.guild.roles.find(`name`, "Muted");
    //start of create role
    if(!muterole){
      try{
        muterole = await message.guild.createRole({
          name: "Muted",
          color: "#070000",
          permissions:[]
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            SPEAK : false
          });
        });
      }catch(e){
        console.log(e.stack);
      }
    }
    //end of create role
    let mutetime = args[1];
    if(!mutetime) return message.reply("**يرجى تحديد وقت الميوت**:x:");

    await(tomute.addRole(muterole.id));
message.reply(`<@${tomute.id}> **تم اعطائه ميوت ومدة الميوت** : ${ms(ms(mutetime))}`);
setTimeout(function(){
      tomute.removeRole(muterole.id);
      message.channel.send(`<@${tomute.id}> **انقضى الوقت وتم فك الميوت عن الشخص**:white_check_mark: `);
    }, ms(mutetime));



  }
if(command === `unmute`) {
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.sendMessage("**ليس لديك صلاحية لفك عن الشخص ميوت**:x: ").then(m => m.delete(5000));
if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply("**I Don't Have `MANAGE_ROLES` Permission**").then(msg => msg.delete(6000))

  let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!toMute) return message.channel.sendMessage("**عليك المنشن أولاّ**:x: ");

  let role = message.guild.roles.find (r => r.name === "Muted");

  if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("**لم يتم اعطاء هذه شخص ميوت من الأساس**:x:")

  await toMute.removeRole(role)
  message.channel.sendMessage("**لقد تم فك الميوت عن شخص بنجاح**:white_check_mark:");

  return;

  }

});




  client.on('message' , message => {
    var prefix = "-";
    let user = message.mentions.users.first() || message.author;
if(message.content.startsWith(prefix+"roles")) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**انت لا تمتلك الخاصيه المطلوبه** | ❎ ");
    const embed = new Discord.RichEmbed()
  .setThumbnail(user.displayAvatarURL)
.addField('User :', `**${user.username}**`)
  .addField(`Roles For User :`, message.guild.members.get(user.id).roles.array(role => role.name).slice(1).join('\n'))
  .setAuthor(`${user.username}`, user.displayAvatarURL)
  .setColor('RANDOM')
    message.channel.send({embed});

}
});




client.on('message', message => {
  if (message.content.startsWith("-avatar")) {

      var mentionned = message.mentions.users.first();
  var king66s;
    if(mentionned){
        var king66s = mentionned;
    } else {
        var king66s = message.author;

    }
      const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
        .setAuthor(message.author.username, message.author.avatarURL)
      .setImage(`${king66s.avatarURL}`)
    message.channel.sendEmbed(embed);

  }
})


client.on('message', msg => {
  if (msg.content === '-suppport') {
    msg.reply('https://discord.gg/CS5qXXR');
  }
});


client.on('message', message => {
  if (!message.content.startsWith(prefix)) return;
  const verifed = ["464824355990536193"];
if (message.content.startsWith(prefix + 'owner')) {
if( verifed.some(word => message.author.id.includes(word)) ) {    return message.channel.sendMessage(`** ولكم يا صاحب البوت منور السيرفر**` + `✅`)
} else {
   message.reply('**انت لست صاحب البوت**' + '❌');
}
}
});

  client.on('message', message => {
  if (true) {
if (message.content === '-invite') {
      message.author.send('https://discordapp.com/api/oauth2/authorize?client_id=463153018850902042&permissions=0&scope=bot').catch(e => console.log(e.stack));

    }
   }
  });


client.on('message', message => {
     if (message.content === "invite") {
     let embed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#9B59B6")
  .addField(" ـــم ارســالك في الخــاص")



  message.channel.sendEmbed(embed);
    }
});



client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help") {
         message.channel.send("شيك على الخاص:walking: " , "تم ")





 message.author.sendMessage(`
 **
==================================
- سرعه اتصال ممتازه :comet:
-سهل الاستخدام:full_moon_with_face:
- صيانه كل يوم:hammer:
-مجاني بل كامل:money_with_wings:
-البوت عربي:grin:
==================================
- البوت فيه خصائص جديدة العاب جديدة:video_game:
-كل يوم خاصية جديدة :new:
==================================

welcome لعمل ترحيب بي الصور سوي روم اسمه

لمعرفة اوامر الميزك :notes: اكتب(-help music)

 الاوامر العامه
 -credits ⇏ لامعرفت رصيدك
 -daily ⇏ لااخذ رصيد يومي
${prefix}members ⇏ يعطيك معلومات عن العضاء
${prefix}server ⇏ يعطيك معلومات عن السيرفر
${prefix}bot ⇏ يعطيك معلومات عن البوت
${prefix}id ⇏ لاضهار معلوماتك الشخصيه
${prefix}avatar ⇏ لا اضهار صورتك الشخصية
${prefix}support⇏ سيرفر الدعم الفني
${prefix}invite⇏ لإ اضافت البوت
=========================
الاوامر الادارية

${prefix}role all {neme roles} ⇏ لا اعطاء جميع الاعضاء الرتبة الذي حدتها
${prefix}role {neme roles} ⇏ لإاعطا العضو رتبة معينه
${prefix}mute ⇏لا اعطا شخص ميوت
${prefix}unmute ⇏ لا فك الميوت عن الشخص
${prefix}inv⇏ لا معرفت كم عدد الاعضاء الي دخلتهم لسرفر
${prefix}mutevoice ⇏ لا اعطاء ميوت صوتي
${prefix}unmutevoice⇏ لا فك ميوت صوتي
${prefix}bc⇏ لا ارسال رساله منخيلاال البوت
${prefix}clear ⇏ لامسح الشات مع العدد
${prefix}ban⇏ لإ عطاء الشخ باند
${prefix}kick⇏ لإ اطاء الشخص كيك

مصممت البوت:hammer_pick: :<@464824355990536193>
**`);

    }
});


client.on('message', function(msg) {
    if(msg.content.startsWith (prefix  + 'server')) {
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(msg.guild.iconURL)
      .setTitle(`Showing Details Of  **${msg.guild.name}*`)
      .addField('🌐** نوع السيرفر**',`[** __${msg.guild.region}__ **]`,true)
      .addField('🏅** __الرتب__**',`[** __${msg.guild.roles.size}__ **]`,true)
      .addField('🔴**__ عدد الاعضاء__**',`[** __${msg.guild.memberCount}__ **]`,true)
      .addField('🔵**__ عدد الاعضاء الاونلاين__**',`[** __${msg.guild.members.filter(m=>m.presence.status == 'online').size}__ **]`,true)
      .addField('📝**__ الرومات الكتابية__**',`[** __${msg.guild.channels.filter(m => m.type === 'text').size}__** ]`,true)
      .addField('🎤**__ رومات الصوت__**',`[** __${msg.guild.channels.filter(m => m.type === 'voice').size}__ **]`,true)
      .addField('👑**__ الأونـر__**',`**${msg.guild.owner}**`,true)
      .addField('🆔**__ ايدي السيرفر__**',`**${msg.guild.id}**`,true)
      .addField('📅**__ تم عمل السيرفر في__**',msg.guild.createdAt.toLocaleString())
      msg.channel.send({embed:embed});
    }
  });




client.on('message', message => {
    if(message.content === "-bot") {
        const embed = new Discord.RichEmbed()
        .setColor("#00FFFF")
  .addField('**الذاكرة المستخدمة 💾**', `${(process.memoryUsage().rss / 1000000).toFixed()}MB`, true)
         .addField('**سرعة الاتصال📡**' , `${Date.now() - message.createdTimestamp}` + ' ms')
        .addField('**استخدام المعالج💿**', `${(process.cpuUsage().rss / 10000).toFixed()}%`, true)
        .addField('**🌐 عدد السيرفرات**' , `${client.guilds.size}`, true)
        .addField('**عدد المستخدمين 👥 **' , `${client.users.size}`, true)
               message.channel.sendEmbed(embed);
           }
});






var antispam = require("anti-spam");//npm i anti-spam

antispam(client, {
  warnBuffer: 3, //الحد الأقصى المسموح به من الرسائل لإرسالها في الفاصل الزمني قبل الحصول على تحذير.
  maxBuffer: 5, // الحد الأقصى المسموح به من الرسائل لإرسالها في الفاصل الزمني قبل الحصول على ميوت.
  interval: 1000, // مقدار الوقت قبل حصول باند
  warningMessage: "stop spamming.", // رسالة تحذير اذا سوا سبام!
  roleMessage: "Muted!!", // الرسالة الي تجي اذا شخص اخذ ميوت
  roleName: "Muted", // اسم رتبة الميوت
  maxDuplicatesWarning: 7, // عدد الرسايل الي قبل التحذيرات
  maxDuplicatesBan: 10, // عدد الرسايل الي يقدر المستخدم يرسلها قبل الميوت
  time: 10, // عدد الوقت الي يجلس لين تسحب رتبة الميوت من الشخص الحسبة برمجية وليست كتابية
});








client.on("guildMemberAdd", member => {
  member.createDM().then(function (channel) {
  return channel.send(`🌹  ولكم نورت السيرفر🌹
👑اسم العضو  ${member}👑
انت العضو رقم ${member.guild.memberCount} `)
}).catch(console.error)
});





client.on ("guildMemberAdd", member => {

   var role = member.guild.roles.find ("name", "- User.");
   member.addRole (role);

});

client.on("message", message => {

            var args = message.content.substring(prefix.length).split(" ");
            if (message.content.startsWith(prefix + "clear")) {
   if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('? | **لا يوجد لديك صلاحية لمسح الشات**');
        var msg;
        msg = parseInt();

      message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
      message.channel.sendMessage("", {embed: {
        title: "Done | تــم مسح الشات",
        color: 0x06DF00,
        description: "تم مسح الرسائل ",
        footer: {
        }
      }}).then(msg => {msg.delete(3000)});
                          }


});



client.login('NDYzMTUzMDE4ODUwOTAyMDQy.DhvlQw.LO2E6YJhhC3r1CMXdvTWT1X1HTQ');
