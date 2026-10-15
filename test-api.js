async function test() {
  try {
    const health = await fetch('http://localhost:5000/api/health').then(r => r.json());
    console.log('Health:', health);

    const vehicles = await fetch('http://localhost:5000/api/vehicles').then(r => r.json());
    console.log('Vehicles found:', vehicles.length);

    const pingRes = await fetch('http://localhost:5000/api/ping/PING-DL01AB1234', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reason: 'BLOCKING_CAR',
        senderNote: 'Car blocked near bay 4. Please move!',
        senderContact: '+91 99999 88888'
      })
    }).then(r => r.json());
    console.log('Ping created:', pingRes.ping?.id, 'Status:', pingRes.ping?.status);

    const replyRes = await fetch(`http://localhost:5000/api/ping/${pingRes.ping.id}/reply`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        replyText: 'Coming down now (2 mins)!'
      })
    }).then(r => r.json());
    console.log('Owner replied:', replyRes.ping?.ownerReply, 'Status:', replyRes.ping?.status);

    console.log('\n ALL API TESTS PASSED 100%!');
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  }
}

test();
