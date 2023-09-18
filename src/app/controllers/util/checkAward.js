const db = require('../../../db/models/index');

module.exports = async function checkAward(data) {
  const courseScore = data.course_score_hk;
  const conductScore = data.conduct_score;
  const scoreD = data.score_d;
  const scoreFail = data.score_fail;
  const studentPosition = data.student_position;

  if (scoreFail == 0 && courseScore >= 3 && (conductScore == 'XS' || conductScore == 'Tốt')) {
    if (courseScore >= 3.6 && conductScore == 'XS' && scoreD == 0) {
      if (studentPosition == 1) {
        const [awardInstance, awardCreated] = await db.Award.findOrCreate({
          where: { student_code: data.student_code, year_code: data.year_code },
          defaults: { award_type: 'SVXS, SVCĐG' },
        });
      } else {
        const [awardInstance, awardCreated] = await db.Award.findOrCreate({
          where: { student_code: data.student_code, year_code: data.year_code },
          defaults: { award_type: 'SVXS' },
        });
      }
    }

    if (courseScore >= 3.2 && scoreD == 0) {
      const [awardInstance, awardCreated] = await db.Award.findOrCreate({
        where: { student_code: data.student_code, year_code: data.year_code },
        defaults: { award_type: 'SVG' },
      });
    }

    if (courseScore >= 3.0 && conductScore == 'XS' && studentPosition == 1) {
      const [awardInstance, awardCreated] = await db.Award.findOrCreate({
        where: { student_code: data.student_code, year_code: data.year_code },
        defaults: { award_type: 'SVCĐG' },
      });
    }
  }
};
