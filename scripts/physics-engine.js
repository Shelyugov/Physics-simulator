const engine = {
	minSpeed: 0.1,

	recalculateState: function(env, dt) {
		applyForces(env, dt);
		moveAllObjects(env, dt);
	},

	moveAllObjects: function(env, dt) {
		env.objects.forEach(function(o) {
			if (Math.abs(o.v.x) > minSpeed) {
				o.x += o.v.x;
			}
			if (Math.abs(o.v.y) > minSpeed) {
				o.y = Math.abs(o.y + o.v.y);
			}
		});
	},

	applyForces: function(env, dt) {
		env.objects.forEach(function(o) {
			o.forces.forEach(function(force) {
				force.applyTo(env, o.v, dt);
			});
		});
	},
};

const forces = {
	// Сила сопротивления воздуха
	airResistanceForce: {
		coef: 0.3, // Сила сопротивления воздуха
		applyTo: function(env, v, dt) {
			v.x -= Math.sign(v.x) * Math.pow(v.x, 2) * coef;
			v.y -= Math.sign(v.y) * Math.pow(v.y, 2) * coef;
		}
	},

	// Сила гравитации
	gravityForce: {
		applyTo: function(env, v, dt) {
			v.y -= env.gCoeffient * dt;
		}
	}
};
