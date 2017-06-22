game.Laser = me.Entity.extend({
    init : function (x, y, angle) {
        var laser = new me.Sprite(0, 0, {
            image : "laser",
            framewidth : 300,
            frameheight : 6
        });
        //laser._super(me.Renderable, "transform", [new me.Matrix2d().identity().scale(0.1, 0.1)]);
        this._super(me.Entity, "init", [x, y, laser]);
        this.z = 5;
        this.body.collisionType = game.collisionTypes.LASER;

        // TODO: Calculate the correct length of the laser to the edge of the viewport.
        this.body.addShape(new me.Rect(32  - 3 * Math.sin(angle), 32 + 3 * Math.cos(angle), 6, 300).rotate(angle - Math.PI / 2), false);
        this.body.shapes.shift();

        //this.renderable._bounds.setShape(x, y, 1, 1);
        //this.renderable.currentTransform.translate(-32 - 3 * Math.sin(angle), 24 + 3 * Math.cos(angle));
        if (angle > 0 && angle <= 1.66)
        {
            this.anchorPoint.set(0.0, 0.0);
            this.renderable.anchorPoint.set(0,0);
            this.renderable.currentTransform.translate(24, 24);
            console.log("1");
        
        }
        if (angle > 1.66 && angle <= Math.PI)
        {
            this.anchorPoint.set(0.0, 0.0);
            this.renderable.anchorPoint.set(0,0);
            this.renderable.currentTransform.translate(-this.renderable.getBounds().width * Math.cos(angle), 24);
            console.log("2");
        }
        if (angle > -Math.PI && angle <= -1.66)
        {
            /*this.anchorPoint.set(0.0, 0.0);
            this.renderable.anchorPoint.set(0,0);
            this.renderable.currentTransform.translate(-Math.cos(angle) * 324, -Math.sin(angle) * 324);
            console.log("3");*/
            this.anchorPoint.set(0.5, 1.0);
            this.renderable.anchorPoint.set(1,0);
            this.renderable.currentTransform.translate(Math.cos(angle) * 200, Math.sin(angle) * 300);
            console.log("3");
        }
        if (angle > -1.66 && angle <= 0)
        {
            this.anchorPoint.set(0.5, 1.0);
            this.renderable.anchorPoint.set(0.0,0.0);
            this.renderable.currentTransform.translate(-this.renderable.getBounds().width / 2 + 24, 0);
            console.log("4");
        }
        //console.log(angle);
        this.renderable.currentTransform.rotate(angle);     
        this.alwaysUpdate = false;
        this.damage = 10;
    },

    update: function (time) {
        this._super(me.Entity, "update", [time]);
        //this.pos.x += this.velx * time/1000;
        //this.pos.y += this.vely * time/1000;
        //this.body.vel.x += this.body.accel.x * time / 1000;
        //this.body.vel.y += this.body.accel.y * time / 1000;

        //this.pos.x = this.pos.x.clamp(0, this.maxX);
        //this.pos.y = this.pos.y.clamp(0, this.maxY);

        //this.body.update();
        me.collision.check(this);
        return true;
    }
});
