game.Laser = me.Entity.extend({
    init : function (x, y, angle) {
        var laser = new me.Sprite(0, 0, {
            image : "laser_sprite",
            framewidth : 1536,
            frameheight : 8
        });
        this._super(me.Entity, "init", [x, y, laser]);
        this.z = 1;
        this.body.collisionType = game.collisionTypes.LASER;
        this.renderable.addAnimation("flow", [0, 1, 2, 3, 4, 5, 6, 7], 60);
        this.renderable.setCurrentAnimation("flow");
        this.angle = angle;

        // TODO: Calculate the correct length of the laser to the edge of the viewport.
        this.body.addShape(new me.Rect(32  - 3 * Math.sin(angle), 32 + 3 * Math.cos(angle), 6, 1536).rotate(angle - Math.PI / 2), false);
        this.body.shapes.shift();
        this.renderable.currentTransform.rotate(angle); 
        this.alwaysUpdate = true;
        this.damage = 20;
    },

    update: function (time) {
        this.body.addShape(new me.Rect(32  - 3 * Math.sin(this.angle), 32 + 3 * Math.cos(this.angle), 6, 1536).rotate(this.angle - Math.PI / 2), false);
        this.body.shapes.shift();

        var laserBounds = this.getBounds();
        var needsCalc = false;
        if (this.angle > 0 && this.angle <= Math.PI/2)
        {
            this.anchorPoint.set(3 * Math.sin(this.angle) / laserBounds.width, 3 * Math.cos(this.angle) / laserBounds.height);
            needsCalc = true;
        }

        if (this.angle > Math.PI/2 && this.angle <= Math.PI && !needsCalc)
        {
            this.anchorPoint.set((laserBounds.width - 3 * Math.sin(this.angle)) / laserBounds.width, -3 * Math.cos(this.angle) / laserBounds.height);
            needsCalc = true;
        }

        if (this.angle >= -Math.PI && this.angle < -Math.PI/2 && !needsCalc)
        {
            this.anchorPoint.set((laserBounds.width + 3 * Math.sin(this.angle)) / laserBounds.width, (laserBounds.height + 3 * Math.cos(this.angle)) / laserBounds.height);
            needsCalc = true;
        }

        if (this.angle >= -Math.PI/2 && this.angle < 0 && !needsCalc)
        {
            this.anchorPoint.set(-3 * Math.sin(this.angle) / laserBounds.width, (laserBounds.height -3 * Math.cos(this.angle)) / laserBounds.height);
        }
        
        this.renderable.anchorPoint.set(0, 0.5);
        this.renderable.currentTransform.identity().rotate(this.angle);
        this._super(me.Entity, "update", [time]);
        me.collision.check(this);
        return true;
    },

    updateAngleAndPos: function (angle, pos) {
        this.angle = angle;
        this.pos = pos;
    }
});
