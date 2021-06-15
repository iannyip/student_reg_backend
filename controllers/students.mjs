import moment from 'moment';

export default function initStudentsController(db) {
  const index = async (request, response) => {
    try {
      const allStudents = await db.Student.findAll({
        attributes: ['id', 'name', 'dob', 'parentId'],
        include: {
          model: db.User,
          attributes: ['id', 'name', 'email'],
        },
      });
      // response.send(allStudents);
      // console.log(allStudents);
      response.render('people/students', { allStudents, moment });
    } catch (error) {
      console.log(error);
    }
  };
  const show = async (request, response) => {
    try {
      const { id } = request.params;
      const student = await db.Student.findOne({
        where: { id },
        include: [
          {
            // Table 1: parent
            model: db.User,
            attributes: ['id', 'name', 'email'],
          },
          {
            // Table 2: signups
            model: db.Course,
            include: db.Coursetype,
          }],
      });
      // response.send(student);
      response.render('people/student', { student, moment });
    } catch (error) {
      console.log(error);
    }
  };
  const createForm = async (request, response) => {
    try {
      const parentList = await db.User.findAll({
        where: { is_parent: true },
        attributes: ['id', 'name'],
      });
      const formMeta = {
        title: 'Add new student',
        notes: 'Parent must be created before adding student',
        formAction: '/students/new',
        method: 'post',
        submitVal: 'Submit',
        cancelVal: 'Cancel',
        onCancel: '/students',
        fields: [
          {
            name: 'name',
            label: 'Student Name',
            type: 'text',
            placeholder: 'Full Name',
          },
          {
            name: 'parentName',
            label: 'Parent Name',
            type: 'select',
            options: parentList,
            placeholder: 'Select from dropdown',
          },
          {
            name: 'dob',
            label: 'Date of Birth',
            type: 'date',
            placeholder: '',
          },
          {
            name: 'additionalInfo',
            label: 'Additional Information',
            type: 'text',
            placeholder: 'Allergies, learning aids',
          },
        ],
      };

      // response.send(formMeta);
      response.render('partial/formTemplate', { form: formMeta });
    } catch (error) {
      console.log(error);
    }
  };

  const create = async (request, response) => {
    try {
      console.log(request.body);
      const formData = request.body;
      const newStudent = await db.Student.create({
        name: formData.name,
        dob: formData.dob,
        additionalInfo: formData.additionalInfo,
        parentId: formData.parentName,
      });
      console.log(newStudent);
      response.redirect(`/student/${newStudent.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  return {
    index,
    show,
    createForm,
    create,
  };
}
