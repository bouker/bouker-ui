const dummyEventList = [
  {
    'id': '1',
    'name': 'Night of standup at ClubXYZ',
    'description': 'Many briliant comedians. Quality stuff.',
    'startTime': moment().subtract(7, 'days').format('YYYY-MM-DD HH:mm'),
    'endTime': moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm'),
    'available': 10,
    'total': 30
  },
  {
    'id': '2',
    'name': 'Projection of film XYZ',
    'description': 'Good movie. Me likes it',
    'startTime': moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm'),
    'endTime': moment().add(8, 'days').format('YYYY-MM-DD HH:mm'),
    'available': 5,
    'total': 20
  },
  {
    'id': '3',
    'name': 'Trip to Prague',
    'description': 'Nice trip.',
    'startTime': moment().add(4, 'days').format('YYYY-MM-DD HH:mm'),
    'endTime': moment().add(8, 'days').format('YYYY-MM-DD HH:mm'),
    'available': 0,
    'total': 10
  },
  {
    'id': '4',
    'name': 'XYZ Music Festival',
    'description': 'Groovy.',
    'startTime': moment().add(8, 'days').format('YYYY-MM-DD HH:mm'),
    'endTime': moment().add(9, 'days').format('YYYY-MM-DD HH:mm'),
    'available': 5,
    'total': 12
  },
  {
    'id': '5',
    'name': 'Folklore Festival XYZ',
    'description': 'Folk + lore',
    'startTime': moment().add(30, 'days').format('YYYY-MM-DD HH:mm'),
    'endTime': moment().add(31, 'days').format('YYYY-MM-DD HH:mm'),
    'available': 1,
    'total': 25
  },
  {
    'id': '6',
    'name': 'FullXYZ',
    'description': 'Full',
    'startTime': moment().add(30, 'days').format('YYYY-MM-DD HH:mm'),
    'endTime': moment().add(34, 'days').format('YYYY-MM-DD HH:mm'),
    'available': 14,
    'total': 14
  }
];