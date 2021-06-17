import moment from 'moment';

export default function initParentsController(db) {
  const index = async (request, response) => {
    try {
      const allParents = await db.Parents.findAll();
      response.send(allParents);
    } catch (error) {
      console.log(error);
    }
  };

  const show = async (request, response) => {
    try {
      const { id } = request.params;
      const parent = await db.User.findOne({
        where: { id },
        include: [
          { model: db.Parent },
          {
            model: db.Student,
            include: {
              model: db.Course,
              include: db.Coursetype,
            },
          },
          {
            model: db.Credit,
            include: db.Attendance,
          },
        ],
      });

      parent.students.forEach((student) => {
        const learningpathwaysArr = [];
        student.courses.forEach((course) => {
          if (!learningpathwaysArr.includes(course.coursetype.learningPathway)) {
            learningpathwaysArr.push(course.coursetype.learningPathway);
          }
        });
        student.dataValues.learningPathways = learningpathwaysArr;
      });
      // response.send(parent);
      response.render('people/parent', { parent, moment });
    } catch (error) {
      console.log(error);
    }
  };

  const createForm = async (request, response) => {
    try {
      const formMeta = {
        title: 'Create new parent',
        notes: '',
        formAction: '/parents/new',
        method: 'post',
        submitVal: 'Submit',
        cancelVal: 'Cancel',
        onCancel: '/students',
        breadcrumbs: [
          { text: 'parents', href: '/students' },
          { text: 'new parent', href: '' },
        ],
        fields: [
          {
            name: 'name',
            label: 'Name',
            type: 'text',
            placeholder: '',
            value: '',
          },
          {
            name: 'mobile',
            label: 'Mobile',
            type: 'text',
            placeholder: '',
            value: '',
          },
          {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: '',
            value: '',
          },
          {
            name: 'address',
            label: 'Address',
            type: 'text',
            placeholder: '',
            value: '',
          },
          {
            name: 'postalCode',
            label: 'Postal Code',
            type: 'text',
            placeholder: '',
            value: '',
          },
        ],
      };
      response.render('partial/formTemplate', { form: formMeta });
    } catch (error) {
      console.log(error);
    }
  };

  const create = async (request, response) => {
    try {
      console.log(request.body);
      const formData = request.body;
      const newUser = await db.User.create({
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        isAdmin: false,
        isParent: true,
      });
      const newParent = await newUser.createParent({
        address: formData.address,
        postalCode: formData.postalCode,
      });
      response.redirect(`/parent/${newUser.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const edit = async (request, response) => {
    try {
      const { id } = request.params;
      const parent = await db.Parent.findOne({
        where: { id },
        include: {
          model: db.User,
          attributes: ['id', 'name', 'mobile', 'email'],
        },
      });
      const parentList = await db.User.findAll({
        where: { is_parent: true },
        attributes: ['id', 'name'],
      });

      const formMeta = {
        title: `Edit parent: ${parent.name}`,
        notes: '',
        formAction: `/parent/edit/${id}?_method=PUT`,
        method: 'post',
        submitVal: 'Update',
        cancelVal: 'Cancel',
        onCancel: `/parent/${id}`,
        breadcrumbs: [
          { text: 'students', href: '/students/' },
          { text: `${parent.name}`, href: `/parent/${id}` },
          { text: 'edit', href: '' },
        ],
        fields: [
          {
            name: 'name',
            label: 'Student Name',
            type: 'text',
            placeholder: 'Full Name',
            value: parent.name,
          },
          {
            name: 'parentName',
            label: 'Parent Name',
            type: 'select',
            options: parentList,
            placeholder: 'Select from dropdown',
            value: parent.user.name, // to figure out
          },
          {
            name: 'dob',
            label: 'Date of Birth',
            type: 'date',
            placeholder: '',
            value: moment(parent.dob).format('YYYY-MM-DD'),
          },
          {
            name: 'additionalInfo',
            label: 'Additional Information',
            type: 'text',
            placeholder: 'Allergies, learning aids',
            value: parent.additionalInfo,
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
