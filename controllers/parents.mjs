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

  // return all methods we define in an object
  return {
    index,
    show,
    createForm,
    create,
  };
}
