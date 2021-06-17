import moment from 'moment';

export default function initStudentsController(db) {
  const index = async (request, response) => {
    try {
      const allStudents = await db.Student.findAll({
        attributes: ['id', 'name', 'dob', 'parentId'],
        include: {
          model: db.User,
          attributes: ['id', 'name', 'email'],
          include: { model: db.Parent, attributes: ['id'] },
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
        breadcrumbs: [
          { text: 'students', href: '/students' },
          { text: 'new student', href: '' },
        ],
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
  const edit = async (request, response) => {
    try {
      const { id } = request.params;
      const student = await db.Student.findOne({
        where: { id },
        include: {
          model: db.User,
          attributes: ['id', 'name'],
        },
      });
      const parentList = await db.User.findAll({
        where: { is_parent: true },
        attributes: ['id', 'name'],
      });

      const formMeta = {
        title: `Edit student: ${student.name}`,
        notes: '',
        formAction: `/student/edit/${id}?_method=PUT`,
        method: 'post',
        submitVal: 'Update',
        cancelVal: 'Cancel',
        onCancel: `/student/${id}`,
        breadcrumbs: [
          { text: 'students', href: '/students/' },
          { text: `${student.name}`, href: `/student/${id}` },
          { text: 'edit', href: '' },
        ],
        fields: [
          {
            name: 'name',
            label: 'Student Name',
            type: 'text',
            placeholder: 'Full Name',
            value: student.name,
          },
          {
            name: 'parentName',
            label: 'Parent Name',
            type: 'select',
            options: parentList,
            placeholder: 'Select from dropdown',
            value: student.user.name, // to figure out
          },
          {
            name: 'dob',
            label: 'Date of Birth',
            type: 'date',
            placeholder: '',
            value: moment(student.dob).format('YYYY-MM-DD'),
          },
          {
            name: 'additionalInfo',
            label: 'Additional Information',
            type: 'text',
            placeholder: 'Allergies, learning aids',
            value: student.additionalInfo,
          },
        ],
      };
      // response.send(student);
      // response.send(formMeta);
      response.render('partial/formTemplate', { form: formMeta });
    } catch (error) {
      console.log(error);
    }
  };
  const update = async (request, response) => {
    try {
      const { id } = request.params;
      const inData = request.body;
      console.log(inData);
      console.log('received update PUT!');

      const updatedStudent = await db.Student.update(
        {
          name: inData.name,
          dob: inData.dob,
          additionalInfo: inData.additionalInfo,
          parentId: inData.parentName,
        },
        { where: { id } },
      );
      response.redirect(`/student/${id}`);
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
    edit,
    update,
  };
}
